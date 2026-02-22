require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = Number(process.env.PORT || 5001);
const FRONTEND_ORIGINS = (process.env.FRONTEND_ORIGINS ||
  process.env.FRONTEND_ORIGIN ||
  "http://localhost:5173,http://127.0.0.1:5173,http://localhost:4173,http://127.0.0.1:4173")
  .split(",")
  .map((v) => v.trim())
  .filter(Boolean);
const TOKEN_SECRET = process.env.TOKEN_SECRET || "replace-this-token-secret";
const TOKEN_EXPIRES_SECONDS = 60 * 60 * 24 * 7;
const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "store.json");
const CLIENT_TYPES = new Set(["individual", "partner", "institutional"]);
const ADMIN_ROLES = new Set(["master_admin", "manager", "associate"]);
const ENQUIRY_STAGES = new Set([
  "initiation",
  "payment_stage",
  "demat_account",
  "successful_completion"
]);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (FRONTEND_ORIGINS.includes(origin)) return callback(null, true);
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.use(express.json());

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    const seed = {
      users: [],
      stocks: [],
      blogs: [],
      enquiries: [],
      pendingActions: []
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(seed, null, 2), "utf8");
  }
}

function readStore() {
  ensureStore();
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

function writeStore(store) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), "utf8");
}

function uid(prefix) {
  return `${prefix}_${crypto.randomBytes(8).toString("hex")}`;
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, hashValue) {
  const [salt, hash] = hashValue.split(":");
  if (!salt || !hash) return false;
  const hashBuf = Buffer.from(hash, "hex");
  const compareBuf = crypto.scryptSync(password, salt, 64);
  return crypto.timingSafeEqual(hashBuf, compareBuf);
}

function b64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function fromB64url(input) {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = base64.length % 4 === 0 ? "" : "=".repeat(4 - (base64.length % 4));
  return Buffer.from(base64 + pad, "base64").toString("utf8");
}

function signToken(payload) {
  const header = b64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = b64url(
    JSON.stringify({
      ...payload,
      exp: Math.floor(Date.now() / 1000) + TOKEN_EXPIRES_SECONDS
    })
  );
  const sig = crypto
    .createHmac("sha256", TOKEN_SECRET)
    .update(`${header}.${body}`)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  return `${header}.${body}.${sig}`;
}

function verifyToken(token) {
  try {
    const [header, body, sig] = token.split(".");
    if (!header || !body || !sig) return null;
    const expected = crypto
      .createHmac("sha256", TOKEN_SECRET)
      .update(`${header}.${body}`)
      .digest("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
      return null;
    }
    const payload = JSON.parse(fromB64url(body));
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch (error) {
    return null;
  }
}

function sanitizeUser(user) {
  const { passwordHash, ...safe } = user;
  return safe;
}

function seedMasterAdmin() {
  const store = readStore();
  const existingMaster = store.users.find(
    (u) => u.kind === "admin" && u.adminRole === "master_admin"
  );
  if (existingMaster) return;

  const email = (process.env.MASTER_ADMIN_EMAIL || "owner@banyan.local")
    .trim()
    .toLowerCase();
  const password = (process.env.MASTER_ADMIN_PASSWORD || "ChangeMe123!").trim();

  const now = new Date().toISOString();
  store.users.push({
    id: uid("usr"),
    firstName: "Master",
    lastName: "Admin",
    email,
    mobile: "",
    companyName: "Banyan",
    kind: "admin",
    adminRole: "master_admin",
    accountType: null,
    linkedUserIds: [],
    passwordHash: hashPassword(password),
    createdAt: now,
    updatedAt: now
  });
  writeStore(store);
  console.log(`Seeded master admin: ${email}`);
}

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    return res.status(401).json({ message: "Missing auth token." });
  }
  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
  const store = readStore();
  const user = store.users.find((u) => u.id === payload.sub);
  if (!user) {
    return res.status(401).json({ message: "User not found." });
  }
  req.authUser = user;
  next();
}

function requireKind(allowedKinds) {
  return (req, res, next) => {
    if (!allowedKinds.includes(req.authUser.kind)) {
      return res.status(403).json({ message: "Access denied." });
    }
    next();
  };
}

function requireAdminRoles(roles) {
  return (req, res, next) => {
    if (req.authUser.kind !== "admin") {
      return res.status(403).json({ message: "Admin access required." });
    }
    if (!roles.includes(req.authUser.adminRole)) {
      return res.status(403).json({ message: "Insufficient role permissions." });
    }
    next();
  };
}

function applyPendingAction(store, pendingAction, approverId) {
  const now = new Date().toISOString();

  if (pendingAction.entity === "stocks") {
    if (pendingAction.operation === "create") {
      store.stocks.push({
        id: uid("stk"),
        ...pendingAction.payload,
        createdAt: now,
        updatedAt: now,
        createdBy: pendingAction.createdBy
      });
    } else if (pendingAction.operation === "update") {
      const stock = store.stocks.find((s) => s.id === pendingAction.entityId);
      if (!stock) throw new Error("Stock not found.");
      Object.assign(stock, pendingAction.payload, { updatedAt: now });
    }
  }

  if (pendingAction.entity === "blogs") {
    if (pendingAction.operation === "create") {
      store.blogs.push({
        id: uid("blg"),
        ...pendingAction.payload,
        createdAt: now,
        updatedAt: now,
        createdBy: pendingAction.createdBy
      });
    } else if (pendingAction.operation === "update") {
      const blog = store.blogs.find((b) => b.id === pendingAction.entityId);
      if (!blog) throw new Error("Blog not found.");
      Object.assign(blog, pendingAction.payload, { updatedAt: now });
    }
  }

  pendingAction.status = "approved";
  pendingAction.reviewedBy = approverId;
  pendingAction.reviewedAt = now;
}

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.json({ reply: "Message is required." });
    }

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant for Banyan Unlisted. Answer clearly. Do not give investment advice."
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.2
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({
      reply: response.data.choices[0].message.content
    });
  } catch (error) {
    console.error("Groq Error:", error.response?.data || error.message);
    res.status(500).json({
      reply: "Server error. Check backend console."
    });
  }
});

app.post("/api/auth/register", (req, res) => {
  const { firstName, lastName, email, mobile, password, accountType, companyName } = req.body;

  if (!firstName || !email || !mobile || !password || !accountType) {
    return res.status(400).json({ message: "Missing required fields." });
  }
  if (!CLIENT_TYPES.has(accountType)) {
    return res.status(400).json({ message: "Invalid account type." });
  }
  if (accountType === "institutional" && !companyName) {
    return res.status(400).json({ message: "Company name is required for institutional users." });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const store = readStore();

  const exists = store.users.find((u) => u.email === normalizedEmail);
  if (exists) {
    return res.status(409).json({ message: "Email already registered." });
  }

  const now = new Date().toISOString();
  const user = {
    id: uid("usr"),
    firstName: firstName.trim(),
    lastName: (lastName || "").trim(),
    email: normalizedEmail,
    mobile: mobile.trim(),
    companyName: (companyName || "").trim(),
    kind: "client",
    accountType,
    adminRole: null,
    linkedUserIds: [],
    passwordHash: hashPassword(password),
    createdAt: now,
    updatedAt: now
  };

  store.users.push(user);
  writeStore(store);

  const token = signToken({
    sub: user.id,
    kind: user.kind,
    accountType: user.accountType,
    adminRole: user.adminRole,
    email: user.email
  });

  return res.status(201).json({
    token,
    user: sanitizeUser(user)
  });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password, portal } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const store = readStore();
  const user = store.users.find((u) => u.email === normalizedEmail);

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  if (portal === "admin" && user.kind !== "admin") {
    return res.status(403).json({ message: "This account is not an admin account." });
  }

  const token = signToken({
    sub: user.id,
    kind: user.kind,
    accountType: user.accountType,
    adminRole: user.adminRole,
    email: user.email
  });

  return res.json({
    token,
    user: sanitizeUser(user)
  });
});

app.get("/api/auth/me", requireAuth, (req, res) => {
  res.json({ user: sanitizeUser(req.authUser) });
});

app.get("/api/stocks", (req, res) => {
  const store = readStore();
  res.json({
    items: store.stocks.sort((a, b) => (a.name > b.name ? 1 : -1))
  });
});

app.get("/api/blogs", (req, res) => {
  const store = readStore();
  res.json({
    items: store.blogs.filter((b) => b.status !== "draft")
  });
});

app.post("/api/enquiries", requireAuth, requireKind(["client"]), (req, res) => {
  const {
    companyName,
    enquiryType,
    quantity,
    minPrice,
    maxPrice,
    additionalInfo,
    name,
    mobile,
    email,
    institutionalCompanyName
  } = req.body;

  if (!companyName || !enquiryType || !quantity || !name || !mobile || !email) {
    return res.status(400).json({ message: "Missing required enquiry fields." });
  }

  const store = readStore();
  const now = new Date().toISOString();
  const enquiry = {
    id: uid("enq"),
    userId: req.authUser.id,
    companyName,
    enquiryType,
    quantity: Number(quantity),
    minPrice: Number(minPrice || 0),
    maxPrice: Number(maxPrice || 0),
    additionalInfo: additionalInfo || "",
    name,
    mobile,
    email,
    institutionalCompanyName: institutionalCompanyName || "",
    stage: "initiation",
    createdAt: now,
    updatedAt: now
  };

  store.enquiries.push(enquiry);
  writeStore(store);
  res.status(201).json({ enquiry });
});

app.get("/api/enquiries/me", requireAuth, requireKind(["client"]), (req, res) => {
  const store = readStore();

  if (req.authUser.accountType === "partner") {
    const linkedUserSet = new Set(req.authUser.linkedUserIds || []);
    linkedUserSet.add(req.authUser.id);
    const items = store.enquiries.filter((e) => linkedUserSet.has(e.userId));
    return res.json({ items });
  }

  const items = store.enquiries.filter((e) => e.userId === req.authUser.id);
  return res.json({ items });
});

app.post("/api/partner/users/link", requireAuth, requireKind(["client"]), (req, res) => {
  if (req.authUser.accountType !== "partner") {
    return res.status(403).json({ message: "Only partner users can link users." });
  }

  const { userEmail } = req.body;
  if (!userEmail) {
    return res.status(400).json({ message: "userEmail is required." });
  }

  const store = readStore();
  const target = store.users.find(
    (u) => u.email === userEmail.trim().toLowerCase() && u.kind === "client"
  );

  if (!target) {
    return res.status(404).json({ message: "Client user not found." });
  }

  const partner = store.users.find((u) => u.id === req.authUser.id);
  const linkedIds = new Set(partner.linkedUserIds || []);
  linkedIds.add(target.id);
  partner.linkedUserIds = Array.from(linkedIds);
  partner.updatedAt = new Date().toISOString();

  writeStore(store);
  res.json({ linkedUserIds: partner.linkedUserIds });
});

app.get("/api/partner/users", requireAuth, requireKind(["client"]), (req, res) => {
  if (req.authUser.accountType !== "partner") {
    return res.status(403).json({ message: "Only partner users can access this endpoint." });
  }
  const store = readStore();
  const linked = new Set(req.authUser.linkedUserIds || []);
  const users = store.users
    .filter((u) => linked.has(u.id))
    .map((u) => sanitizeUser(u));
  res.json({ users });
});

app.get(
  "/api/admin/analytics",
  requireAuth,
  requireAdminRoles(["master_admin", "manager", "associate"]),
  (req, res) => {
    const store = readStore();
    const analytics = {
      totalUsers: store.users.filter((u) => u.kind === "client").length,
      totalAdmins: store.users.filter((u) => u.kind === "admin").length,
      totalStocks: store.stocks.length,
      totalBlogs: store.blogs.length,
      totalEnquiries: store.enquiries.length,
      pendingActions: store.pendingActions.filter((p) => p.status === "pending").length
    };
    res.json({ analytics });
  }
);

app.get(
  "/api/admin/admin-users",
  requireAuth,
  requireAdminRoles(["master_admin", "manager"]),
  (req, res) => {
    const store = readStore();
    const users = store.users
      .filter((u) => u.kind === "admin")
      .map((u) => sanitizeUser(u));
    res.json({ users });
  }
);

app.post(
  "/api/admin/admin-users",
  requireAuth,
  requireAdminRoles(["master_admin", "manager"]),
  (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    if (!firstName || !email || !password || !role) {
      return res.status(400).json({ message: "Missing required fields." });
    }
    if (!ADMIN_ROLES.has(role) || role === "master_admin") {
      return res.status(400).json({ message: "Invalid admin role." });
    }
    if (req.authUser.adminRole === "manager" && role === "manager") {
      return res.status(403).json({ message: "Managers cannot create manager accounts." });
    }

    const store = readStore();
    const normalizedEmail = email.trim().toLowerCase();

    if (store.users.find((u) => u.email === normalizedEmail)) {
      return res.status(409).json({ message: "Email already in use." });
    }

    const now = new Date().toISOString();
    const user = {
      id: uid("usr"),
      firstName: firstName.trim(),
      lastName: (lastName || "").trim(),
      email: normalizedEmail,
      mobile: "",
      companyName: "Banyan",
      kind: "admin",
      adminRole: role,
      accountType: null,
      linkedUserIds: [],
      passwordHash: hashPassword(password),
      createdAt: now,
      updatedAt: now,
      createdBy: req.authUser.id
    };

    store.users.push(user);
    writeStore(store);
    res.status(201).json({ user: sanitizeUser(user) });
  }
);

app.delete(
  "/api/admin/admin-users/:id",
  requireAuth,
  requireAdminRoles(["master_admin", "manager"]),
  (req, res) => {
    const { id } = req.params;
    const store = readStore();
    const target = store.users.find((u) => u.id === id && u.kind === "admin");

    if (!target) {
      return res.status(404).json({ message: "Admin user not found." });
    }
    if (target.adminRole === "master_admin") {
      return res.status(403).json({ message: "Cannot remove master admin." });
    }
    if (req.authUser.adminRole === "manager" && target.adminRole === "manager") {
      return res.status(403).json({ message: "Managers cannot remove managers." });
    }

    store.users = store.users.filter((u) => u.id !== id);
    writeStore(store);
    res.json({ success: true });
  }
);

app.get(
  "/api/admin/stocks",
  requireAuth,
  requireAdminRoles(["master_admin", "manager", "associate"]),
  (req, res) => {
    const store = readStore();
    res.json({ items: store.stocks });
  }
);

app.post(
  "/api/admin/stocks",
  requireAuth,
  requireAdminRoles(["master_admin", "manager", "associate"]),
  (req, res) => {
    const { name, isin, sector, price } = req.body;
    if (!name || !isin || !sector || price === undefined) {
      return res.status(400).json({ message: "Missing stock fields." });
    }

    const store = readStore();
    const payload = { name, isin, sector, price: Number(price) };

    if (req.authUser.adminRole === "associate") {
      store.pendingActions.push({
        id: uid("pnd"),
        entity: "stocks",
        operation: "create",
        entityId: null,
        payload,
        status: "pending",
        createdBy: req.authUser.id,
        createdAt: new Date().toISOString()
      });
      writeStore(store);
      return res.status(202).json({ message: "Submitted for manager approval." });
    }

    const now = new Date().toISOString();
    const stock = {
      id: uid("stk"),
      ...payload,
      createdAt: now,
      updatedAt: now,
      createdBy: req.authUser.id
    };
    store.stocks.push(stock);
    writeStore(store);
    res.status(201).json({ item: stock });
  }
);

app.put(
  "/api/admin/stocks/:id",
  requireAuth,
  requireAdminRoles(["master_admin", "manager", "associate"]),
  (req, res) => {
    const { id } = req.params;
    const { name, isin, sector, price } = req.body;
    const store = readStore();
    const stock = store.stocks.find((s) => s.id === id);

    if (!stock) {
      return res.status(404).json({ message: "Stock not found." });
    }

    const payload = {
      name: name || stock.name,
      isin: isin || stock.isin,
      sector: sector || stock.sector,
      price: price !== undefined ? Number(price) : stock.price
    };

    if (req.authUser.adminRole === "associate") {
      store.pendingActions.push({
        id: uid("pnd"),
        entity: "stocks",
        operation: "update",
        entityId: id,
        payload,
        status: "pending",
        createdBy: req.authUser.id,
        createdAt: new Date().toISOString()
      });
      writeStore(store);
      return res.status(202).json({ message: "Update submitted for manager approval." });
    }

    Object.assign(stock, payload, { updatedAt: new Date().toISOString() });
    writeStore(store);
    res.json({ item: stock });
  }
);

app.delete(
  "/api/admin/stocks/:id",
  requireAuth,
  requireAdminRoles(["master_admin", "manager"]),
  (req, res) => {
    const { id } = req.params;
    const store = readStore();
    const exists = store.stocks.some((s) => s.id === id);
    if (!exists) {
      return res.status(404).json({ message: "Stock not found." });
    }

    store.stocks = store.stocks.filter((s) => s.id !== id);
    writeStore(store);
    res.json({ success: true });
  }
);

app.get(
  "/api/admin/blogs",
  requireAuth,
  requireAdminRoles(["master_admin", "manager", "associate"]),
  (req, res) => {
    const store = readStore();
    res.json({ items: store.blogs });
  }
);

app.post(
  "/api/admin/blogs",
  requireAuth,
  requireAdminRoles(["master_admin", "manager", "associate"]),
  (req, res) => {
    const { title, slug, content, status } = req.body;
    if (!title || !slug || !content) {
      return res.status(400).json({ message: "Missing blog fields." });
    }

    const store = readStore();
    const payload = {
      title,
      slug,
      content,
      status: status || "published"
    };

    if (req.authUser.adminRole === "associate") {
      store.pendingActions.push({
        id: uid("pnd"),
        entity: "blogs",
        operation: "create",
        entityId: null,
        payload,
        status: "pending",
        createdBy: req.authUser.id,
        createdAt: new Date().toISOString()
      });
      writeStore(store);
      return res.status(202).json({ message: "Submitted for manager approval." });
    }

    const now = new Date().toISOString();
    const blog = {
      id: uid("blg"),
      ...payload,
      createdAt: now,
      updatedAt: now,
      createdBy: req.authUser.id
    };
    store.blogs.push(blog);
    writeStore(store);
    res.status(201).json({ item: blog });
  }
);

app.put(
  "/api/admin/blogs/:id",
  requireAuth,
  requireAdminRoles(["master_admin", "manager", "associate"]),
  (req, res) => {
    const { id } = req.params;
    const store = readStore();
    const blog = store.blogs.find((b) => b.id === id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    const payload = {
      title: req.body.title || blog.title,
      slug: req.body.slug || blog.slug,
      content: req.body.content || blog.content,
      status: req.body.status || blog.status
    };

    if (req.authUser.adminRole === "associate") {
      store.pendingActions.push({
        id: uid("pnd"),
        entity: "blogs",
        operation: "update",
        entityId: id,
        payload,
        status: "pending",
        createdBy: req.authUser.id,
        createdAt: new Date().toISOString()
      });
      writeStore(store);
      return res.status(202).json({ message: "Update submitted for manager approval." });
    }

    Object.assign(blog, payload, { updatedAt: new Date().toISOString() });
    writeStore(store);
    res.json({ item: blog });
  }
);

app.delete(
  "/api/admin/blogs/:id",
  requireAuth,
  requireAdminRoles(["master_admin", "manager"]),
  (req, res) => {
    const { id } = req.params;
    const store = readStore();
    const exists = store.blogs.some((b) => b.id === id);
    if (!exists) {
      return res.status(404).json({ message: "Blog not found." });
    }

    store.blogs = store.blogs.filter((b) => b.id !== id);
    writeStore(store);
    res.json({ success: true });
  }
);

app.get(
  "/api/admin/pending-actions",
  requireAuth,
  requireAdminRoles(["master_admin", "manager"]),
  (req, res) => {
    const store = readStore();
    const items = store.pendingActions.filter((p) => p.status === "pending");
    res.json({ items });
  }
);

app.post(
  "/api/admin/pending-actions/:id/approve",
  requireAuth,
  requireAdminRoles(["master_admin", "manager"]),
  (req, res) => {
    const { id } = req.params;
    const store = readStore();
    const action = store.pendingActions.find((p) => p.id === id);

    if (!action) {
      return res.status(404).json({ message: "Pending action not found." });
    }
    if (action.status !== "pending") {
      return res.status(400).json({ message: "Action already reviewed." });
    }

    try {
      applyPendingAction(store, action, req.authUser.id);
      writeStore(store);
      return res.json({ action });
    } catch (error) {
      return res.status(400).json({ message: error.message || "Unable to approve action." });
    }
  }
);

app.post(
  "/api/admin/pending-actions/:id/reject",
  requireAuth,
  requireAdminRoles(["master_admin", "manager"]),
  (req, res) => {
    const { id } = req.params;
    const store = readStore();
    const action = store.pendingActions.find((p) => p.id === id);

    if (!action) {
      return res.status(404).json({ message: "Pending action not found." });
    }
    if (action.status !== "pending") {
      return res.status(400).json({ message: "Action already reviewed." });
    }

    action.status = "rejected";
    action.reviewReason = req.body.reason || "";
    action.reviewedBy = req.authUser.id;
    action.reviewedAt = new Date().toISOString();
    writeStore(store);
    return res.json({ action });
  }
);

app.get(
  "/api/admin/enquiries",
  requireAuth,
  requireAdminRoles(["master_admin", "manager", "associate"]),
  (req, res) => {
    const store = readStore();
    res.json({ items: store.enquiries });
  }
);

app.put(
  "/api/admin/enquiries/:id/status",
  requireAuth,
  requireAdminRoles(["master_admin", "manager", "associate"]),
  (req, res) => {
    const { id } = req.params;
    const { stage } = req.body;
    if (!ENQUIRY_STAGES.has(stage)) {
      return res.status(400).json({ message: "Invalid enquiry stage." });
    }

    const store = readStore();
    const enquiry = store.enquiries.find((e) => e.id === id);
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found." });
    }

    enquiry.stage = stage;
    enquiry.updatedAt = new Date().toISOString();
    writeStore(store);
    res.json({ enquiry });
  }
);

seedMasterAdmin();
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
