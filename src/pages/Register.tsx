import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";

const accountTypes = [
  { id: "individual", label: "Individual", desc: "Personal investment account" },
  { id: "partner", label: "Partner", desc: "Dealer or franchise partner" },
  { id: "institutional", label: "Institutional", desc: "Multi-user corporate account" },
];

const Register = () => {
  const [type, setType] = useState("individual");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center min-h-screen pt-20 pb-8 px-4">
        <div className="w-full max-w-lg glass rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-heading font-bold mb-2">Create Account</h1>
            <p className="text-sm text-muted-foreground">Join India's leading unlisted shares platform</p>
          </div>

          {/* Account Type */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {accountTypes.map((t) => (
              <button
                key={t.id}
                onClick={() => setType(t.id)}
                className={`p-3 rounded-xl border text-center transition-all ${type === t.id ? "border-primary bg-primary/10 text-primary" : "border-border/50 text-muted-foreground hover:border-border"}`}
              >
                <div className="text-sm font-heading font-semibold">{t.label}</div>
                <div className="text-xs mt-1 text-muted-foreground">{t.desc}</div>
              </button>
            ))}
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground">First Name</Label>
                <Input placeholder="First name" className="mt-1 bg-secondary border-border/50" />
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Last Name</Label>
                <Input placeholder="Last name" className="mt-1 bg-secondary border-border/50" />
              </div>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Email</Label>
              <Input type="email" placeholder="your@email.com" className="mt-1 bg-secondary border-border/50" />
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Mobile Number</Label>
              <Input placeholder="+91 XXXXX XXXXX" className="mt-1 bg-secondary border-border/50" />
            </div>
            {type === "institutional" && (
              <div>
                <Label className="text-sm text-muted-foreground">Company Name</Label>
                <Input placeholder="Company name" className="mt-1 bg-secondary border-border/50" />
              </div>
            )}
            <div>
              <Label className="text-sm text-muted-foreground">Password</Label>
              <Input type="password" placeholder="••••••••" className="mt-1 bg-secondary border-border/50" />
            </div>
            <Button className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90">Create Account</Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
