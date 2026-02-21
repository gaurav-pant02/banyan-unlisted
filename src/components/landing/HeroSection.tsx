import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const stats = [
  { value: "500+", label: "Unlisted Companies", icon: TrendingUp },
  { value: "₹2000Cr+", label: "Transaction Value", icon: Shield },
  { value: "10,000+", label: "Active Investors", icon: Users },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted-foreground mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            India's Premier Unlisted Shares Platform
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Invest in India's
            <br />
            <span className="text-gradient-primary">Private Growth</span>
            <br />
            Companies
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Access pre-IPO and unlisted shares of high-growth companies. Research, invest, and grow your portfolio with trusted expertise.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/register">
              <Button size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity text-base px-8 gap-2">
                Start Investing <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/screener">
              <Button size="lg" variant="outline" className="text-base px-8 border-border/50 hover:bg-secondary/50">
                Explore Screener
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="glass-hover rounded-xl p-5 text-center">
                <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <div className="text-2xl font-heading font-bold text-foreground">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
