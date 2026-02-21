import { Banknote, ShieldCheck, Clock, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Sellers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">For <span className="text-gradient-gold">Sellers</span></h1>
          <p className="text-muted-foreground max-w-lg mx-auto">Sell your unlisted or ESOP shares with fair pricing and secure transactions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[
            { icon: Banknote, title: "Fair Valuation", desc: "Get the best price for your shares with our transparent valuation methodology." },
            { icon: ShieldCheck, title: "Secure Transfer", desc: "End-to-end secure share transfers via NSDL/CDSL with full documentation." },
            { icon: Clock, title: "Quick Settlement", desc: "Fast transaction processing with prompt payment settlement." },
            { icon: Handshake, title: "Large Buyer Network", desc: "Access to our extensive network of verified buyers across India." },
          ].map((item) => (
            <div key={item.title} className="glass-hover rounded-xl p-6">
              <item.icon className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-heading font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/register">
            <Button size="lg" className="bg-gradient-gold text-accent-foreground hover:opacity-90">List Your Shares</Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sellers;
