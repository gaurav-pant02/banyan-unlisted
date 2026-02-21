import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, TrendingUp, TrendingDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const allCompanies = [
  { name: "Swiggy Ltd", sector: "Food Tech", price: "₹540", change: "+3.2%", up: true },
  { name: "BOAT Electronics", sector: "Consumer Electronics", price: "₹1,580", change: "+1.8%", up: true },
  { name: "PhonePe Pvt Ltd", sector: "Fintech", price: "₹850", change: "-0.5%", up: false },
  { name: "OYO Rooms", sector: "Hospitality", price: "₹62", change: "+5.1%", up: true },
  { name: "NSE India Ltd", sector: "Financial Services", price: "₹1,420", change: "+0.9%", up: true },
  { name: "HDB Financial", sector: "NBFC", price: "₹1,050", change: "+2.7%", up: true },
  { name: "Hero FinCorp", sector: "NBFC", price: "₹1,620", change: "+3.5%", up: true },
  { name: "Vikram Solar", sector: "Renewable Energy", price: "₹380", change: "-1.2%", up: false },
];

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const results = query.length >= 2 ? allCompanies.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()) || c.sector.toLowerCase().includes(query.toLowerCase())) : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-heading font-bold mb-6 text-center">
            Search <span className="text-gradient-primary">Companies</span>
          </h1>
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by company name or sector..."
              className="pl-12 py-6 text-lg bg-secondary border-border/50"
              autoFocus
            />
          </div>

          {query.length >= 2 && (
            <div className="space-y-2">
              {results.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No companies found for "{query}"</p>
              ) : (
                results.map((c) => (
                  <Link key={c.name} to={`/companies/${encodeURIComponent(c.name)}`}>
                    <div className="glass-hover rounded-xl p-4 flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center font-heading font-bold text-primary text-sm">{c.name.charAt(0)}</div>
                        <div>
                          <h3 className="font-heading font-semibold group-hover:text-primary transition-colors">{c.name}</h3>
                          <p className="text-xs text-muted-foreground">{c.sector}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-heading font-bold">{c.price}</div>
                        <div className={`text-xs flex items-center gap-1 ${c.up ? "text-primary" : "text-destructive"}`}>
                          {c.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {c.change}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
