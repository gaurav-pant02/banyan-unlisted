import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const companies = [
  { name: "Swiggy Ltd", sector: "Food Tech", price: "₹540", change: "+3.2%", up: true, isin: "INE07Y401019" },
  { name: "BOAT Electronics", sector: "Consumer Electronics", price: "₹1,580", change: "+1.8%", up: true, isin: "INE03IC01018" },
  { name: "PhonePe Pvt Ltd", sector: "Fintech", price: "₹850", change: "-0.5%", up: false, isin: "INE0CCK01010" },
  { name: "OYO Rooms", sector: "Hospitality", price: "₹62", change: "+5.1%", up: true, isin: "INE0CE901018" },
  { name: "Chennai Super Kings", sector: "Sports", price: "₹185", change: "+2.4%", up: true, isin: "INE09GI01018" },
  { name: "Vikram Solar", sector: "Renewable Energy", price: "₹380", change: "-1.2%", up: false, isin: "INE0J5X01017" },
  { name: "NSE India Ltd", sector: "Financial Services", price: "₹1,420", change: "+0.9%", up: true, isin: "INE721I01024" },
  { name: "HDB Financial", sector: "NBFC", price: "₹1,050", change: "+2.7%", up: true, isin: "INE756I01020" },
];

const CompaniesSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Leading Private <span className="text-gradient-primary">Growth Companies</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Discover India's most promising unlisted companies across sectors
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {companies.map((c) => (
            <Link key={c.name} to={`/companies/${encodeURIComponent(c.name)}`}>
              <div className="glass-hover rounded-xl p-5 group cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center font-heading font-bold text-primary text-sm">
                    {c.name.charAt(0)}
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${c.up ? "text-primary" : "text-destructive"}`}>
                    {c.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {c.change}
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">{c.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{c.sector}</p>
                <div className="text-xl font-heading font-bold text-foreground">{c.price}</div>
                <p className="text-xs text-muted-foreground mt-1">ISIN: {c.isin}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/companies">
            <Button variant="outline" className="gap-2 border-border/50 hover:bg-secondary/50">
              View All Companies <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
