import { Link } from "react-router-dom";
import { ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const mainboardIPOs = [
  { name: "Hexaware Technologies", date: "Feb 2025", size: "₹8,750 Cr", price: "₹674-708", status: "Listed" },
  { name: "Dr. Agarwal's Health", date: "Jan 2025", size: "₹3,027 Cr", price: "₹382-402", status: "Listed" },
  { name: "Capital Infra Trust", date: "Jan 2025", size: "₹2,488 Cr", price: "₹99-100", status: "Listed" },
  { name: "Stallion India Fluoro", date: "Jan 2025", size: "₹199 Cr", price: "₹85-90", status: "Listed" },
  { name: "Quality Power Elec", date: "Dec 2024", size: "₹858 Cr", price: "₹401-425", status: "Listed" },
];

const smeIPOs = [
  { name: "Aditya Ultra Steel", date: "Feb 2025", size: "₹35 Cr", price: "₹90-94", status: "Open" },
  { name: "Nupur Recyclers", date: "Feb 2025", size: "₹42 Cr", price: "₹118-124", status: "Listed" },
  { name: "Malpani Pipes", date: "Jan 2025", size: "₹28 Cr", price: "₹56-60", status: "Listed" },
  { name: "Technichem Organics", date: "Jan 2025", size: "₹25 Cr", price: "₹65-68", status: "Listed" },
  { name: "GB Logistics", date: "Dec 2024", size: "₹20 Cr", price: "₹38-40", status: "Listed" },
];

const IPOTable = ({ title, data }: { title: string; data: typeof mainboardIPOs }) => (
  <div className="glass rounded-xl overflow-hidden">
    <div className="px-6 py-4 border-b border-border/30">
      <h3 className="font-heading font-semibold text-lg">{title}</h3>
    </div>
    <Table>
      <TableHeader>
        <TableRow className="border-border/30 hover:bg-transparent">
          <TableHead className="text-muted-foreground">Company</TableHead>
          <TableHead className="text-muted-foreground">Date</TableHead>
          <TableHead className="text-muted-foreground">Issue Size</TableHead>
          <TableHead className="text-muted-foreground">Price Band</TableHead>
          <TableHead className="text-muted-foreground">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((ipo) => (
          <TableRow key={ipo.name} className="border-border/20 hover:bg-secondary/30 cursor-pointer">
            <TableCell className="font-medium">{ipo.name}</TableCell>
            <TableCell className="text-muted-foreground">{ipo.date}</TableCell>
            <TableCell>{ipo.size}</TableCell>
            <TableCell>{ipo.price}</TableCell>
            <TableCell>
              <span className={`text-xs px-2 py-1 rounded-full ${ipo.status === "Open" ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"}`}>
                {ipo.status}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <div className="px-6 py-3 border-t border-border/20 flex items-center justify-center">
      <Link to="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
        <Lock className="w-3 h-3" /> Login to view archived companies
      </Link>
    </div>
  </div>
);

const IPOTableSection = () => {
  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Latest <span className="text-gradient-gold">IPO Listings</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Stay updated with the latest mainboard and SME IPOs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <IPOTable title="Mainboard IPOs" data={mainboardIPOs} />
          <IPOTable title="SME IPOs" data={smeIPOs} />
        </div>
      </div>
    </section>
  );
};

export default IPOTableSection;
