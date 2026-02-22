import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import { API_BASE_URL, setSession } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";

const accountTypes = [
  { id: "individual", label: "Individual", desc: "Personal investment account" },
  { id: "partner", label: "Partner", desc: "Dealer or consultant account" },
  { id: "institutional", label: "Institutional", desc: "Multi-user corporate account" },
] as const;

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [type, setType] = useState<(typeof accountTypes)[number]["id"]>("individual");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    companyName: "",
    password: "",
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          accountType: type,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to register.");
      }

      setSession(data);
      toast({
        title: "Registration successful",
        description: "Your account has been created.",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center min-h-screen pt-20 pb-8 px-4">
        <div className="w-full max-w-lg glass rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-heading font-bold mb-2">Create Account</h1>
            <p className="text-sm text-muted-foreground">
              Join India's leading unlisted shares platform
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-6">
            {accountTypes.map((t) => (
              <button
                type="button"
                key={t.id}
                onClick={() => setType(t.id)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  type === t.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/50 text-muted-foreground hover:border-border"
                }`}
              >
                <div className="text-sm font-heading font-semibold">{t.label}</div>
                <div className="text-xs mt-1 text-muted-foreground">{t.desc}</div>
              </button>
            ))}
          </div>

          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground">First Name</Label>
                <Input
                  required
                  placeholder="First name"
                  className="mt-1 bg-secondary border-border/50"
                  value={form.firstName}
                  onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))}
                />
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Last Name</Label>
                <Input
                  placeholder="Last name"
                  className="mt-1 bg-secondary border-border/50"
                  value={form.lastName}
                  onChange={(e) => setForm((prev) => ({ ...prev, lastName: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Email</Label>
              <Input
                required
                type="email"
                placeholder="your@email.com"
                className="mt-1 bg-secondary border-border/50"
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Mobile Number</Label>
              <Input
                required
                placeholder="+91 XXXXX XXXXX"
                className="mt-1 bg-secondary border-border/50"
                value={form.mobile}
                onChange={(e) => setForm((prev) => ({ ...prev, mobile: e.target.value }))}
              />
            </div>
            {type === "institutional" && (
              <div>
                <Label className="text-sm text-muted-foreground">Company Name</Label>
                <Input
                  required
                  placeholder="Company name"
                  className="mt-1 bg-secondary border-border/50"
                  value={form.companyName}
                  onChange={(e) => setForm((prev) => ({ ...prev, companyName: e.target.value }))}
                />
              </div>
            )}
            <div>
              <Label className="text-sm text-muted-foreground">Password</Label>
              <Input
                required
                type="password"
                placeholder="Password"
                className="mt-1 bg-secondary border-border/50"
                value={form.password}
                onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90"
            >
              {loading ? "Creating..." : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
