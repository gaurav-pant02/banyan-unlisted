import { useState } from "react";
import { Search, Lock, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const screenerData = [
  { name: "Swiggy Ltd", sector: "Food Tech", price: "₹540", mcap: "₹36,000 Cr", pe: "N/A", change: "+3.2%" },
  { name: "BOAT Electronics", sector: "Consumer", price: "₹1,580", mcap: "₹18,000 Cr", pe: "45.2", change: "+1.8%" },
  { name: "PhonePe Pvt Ltd", sector: "Fintech", price: "₹850", mcap: "₹52,000 Cr", pe: "N/A", change: "-0.5%" },
  { name: "NSE India Ltd", sector: "Financial", price: "₹1,420", mcap: "₹70,000 Cr", pe: "22.1", change: "+0.9%" },
  { name: "HDB Financial", sector: "NBFC", price: "₹1,050", mcap: "₹84,000 Cr", pe: "18.5", change: "+2.7%" },
  { name: "OYO Rooms", sector: "Hospitality", price: "₹62", mcap: "₹8,500 Cr", pe: "N/A", change: "+5.1%" },
  { name: "Chennai Super Kings", sector: "Sports", price: "₹185", mcap: "₹1,800 Cr", pe: "12.3", change: "+2.4%" },
  { name: "Vikram Solar", sector: "Energy", price: "₹380", mcap: "₹4,200 Cr", pe: "25.7", change: "-1.2%" },
];

const Screener = () => {
  const [search, setSearch] = useState("");
  const filtered = screenerData.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold mb-2">Stock <span className="text-gradient-primary">Screener</span></h1>
          <p className="text-muted-foreground">Filter and analyze unlisted companies</p>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search companies..."
              className="pl-10 bg-secondary border-border/50"
            />
          </div>
        </div>

        <div className="glass rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border/30 hover:bg-transparent">
                <TableHead className="text-muted-foreground">Company</TableHead>
                <TableHead className="text-muted-foreground">Sector</TableHead>
                <TableHead className="text-muted-foreground">Price</TableHead>
                <TableHead className="text-muted-foreground">Market Cap</TableHead>
                <TableHead className="text-muted-foreground flex items-center gap-1">P/E <ArrowUpDown className="w-3 h-3" /></TableHead>
                <TableHead className="text-muted-foreground">Change</TableHead>
                <TableHead className="text-muted-foreground">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.name} className="border-border/20 hover:bg-secondary/30">
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell className="text-muted-foreground">{c.sector}</TableCell>
                  <TableCell>{c.price}</TableCell>
                  <TableCell>{c.mcap}</TableCell>
                  <TableCell>{c.pe}</TableCell>
                  <TableCell className={c.change.startsWith("+") ? "text-primary" : "text-destructive"}>{c.change}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-primary gap-1">
                      <Lock className="w-3 h-3" /> View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Screener;
