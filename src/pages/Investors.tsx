import { TrendingUp, Shield, BarChart3, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Investors = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">For <span className="text-gradient-primary">Investors</span></h1>
          <p className="text-muted-foreground max-w-lg mx-auto">Access pre-IPO opportunities and build your portfolio with high-growth unlisted companies</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[
            { icon: TrendingUp, title: "Early Access", desc: "Get access to promising companies before they go public. Benefit from early-stage valuations." },
            { icon: Shield, title: "Research Backed", desc: "Every company on our platform is backed by in-house research and due diligence." },
            { icon: BarChart3, title: "Portfolio Tracking", desc: "Track your unlisted portfolio performance alongside your listed investments." },
            { icon: Users, title: "Dedicated Support", desc: "Personal relationship managers for institutional and HNI investors." },
          ].map((item) => (
            <div key={item.title} className="glass-hover rounded-xl p-6">
              <item.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/register">
            <Button size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90">Start Investing Today</Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Investors;
