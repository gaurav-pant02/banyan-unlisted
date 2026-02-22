export type ClientAccountType = "individual" | "partner" | "institutional";
export type AdminRole = "master_admin" | "manager" | "associate";
export type PortalType = "user" | "admin";

export type AuthUser = {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  mobile?: string;
  companyName?: string;
  kind: "client" | "admin";
  accountType?: ClientAccountType | null;
  adminRole?: AdminRole | null;
};

export type AuthSession = {
  token: string;
  user: AuthUser;
};

const STORAGE_KEY = "banyan_auth_session";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

export function getSession(): AuthSession | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

export function setSession(session: AuthSession) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
}

export function isAdmin(user: AuthUser | null | undefined) {
  return user?.kind === "admin";
}
