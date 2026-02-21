import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, TrendingUp, TrendingDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const allCompanies = [
  { name: "Swiggy Ltd", sector: "Food Tech", price: "₹540", change: "+3.2%", up: true, city: "Bangalore" },
  { name: "BOAT Electronics", sector: "Consumer Electronics", price: "₹1,580", change: "+1.8%", up: true, city: "Delhi" },
  { name: "PhonePe Pvt Ltd", sector: "Fintech", price: "₹850", change: "-0.5%", up: false, city: "Bangalore" },
  { name: "OYO Rooms", sector: "Hospitality", price: "₹62", change: "+5.1%", up: true, city: "Gurugram" },
  { name: "Chennai Super Kings", sector: "Sports", price: "₹185", change: "+2.4%", up: true, city: "Chennai" },
  { name: "Vikram Solar", sector: "Renewable Energy", price: "₹380", change: "-1.2%", up: false, city: "Kolkata" },
  { name: "NSE India Ltd", sector: "Financial Services", price: "₹1,420", change: "+0.9%", up: true, city: "Mumbai" },
  { name: "HDB Financial", sector: "NBFC", price: "₹1,050", change: "+2.7%", up: true, city: "Mumbai" },
  { name: "Tata Technologies", sector: "IT Services", price: "₹920", change: "+1.1%", up: true, city: "Pune" },
  { name: "Motilal Oswal AMC", sector: "Asset Management", price: "₹210", change: "+0.4%", up: true, city: "Mumbai" },
  { name: "NCDEX", sector: "Exchange", price: "₹340", change: "-0.8%", up: false, city: "Mumbai" },
  { name: "Hero FinCorp", sector: "NBFC", price: "₹1,620", change: "+3.5%", up: true, city: "Delhi" },
];

const Companies = () => {
  const [search, setSearch] = useState("");
  const filtered = allCompanies.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.sector.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold mb-2">Unlisted <span className="text-gradient-primary">Companies</span></h1>
          <p className="text-muted-foreground">Discover India's top private growth companies</p>
        </div>

        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by company or sector..." className="pl-10 bg-secondary border-border/50" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((c) => (
            <Link key={c.name} to={`/companies/${encodeURIComponent(c.name)}`}>
              <div className="glass-hover rounded-xl p-5 group cursor-pointer h-full">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center font-heading font-bold text-primary text-sm">{c.name.charAt(0)}</div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${c.up ? "text-primary" : "text-destructive"}`}>
                    {c.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {c.change}
                  </div>
                </div>
                <h3 className="font-heading font-semibold group-hover:text-primary transition-colors">{c.name}</h3>
                <p className="text-xs text-muted-foreground">{c.sector} • {c.city}</p>
                <div className="text-xl font-heading font-bold mt-2">{c.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Companies;
