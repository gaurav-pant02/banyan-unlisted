import { useParams } from "react-router-dom";
import { useState } from "react";
import { Lock, TrendingUp, Building2, MapPin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CompanyDetail = () => {
  const { name } = useParams();
  const companyName = decodeURIComponent(name || "Company");
  const [enquiryType, setEnquiryType] = useState("retail");
  const [action, setAction] = useState("buy");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Header */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center font-heading font-bold text-primary text-xl">{companyName.charAt(0)}</div>
                <div>
                  <h1 className="text-2xl font-heading font-bold">{companyName}</h1>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> Technology</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Mumbai</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Price", value: "₹540" },
                  { label: "Listing Status", value: "Unlisted" },
                  { label: "Sector", value: "Technology" },
                  { label: "Demat", value: "NSDL/CDSL" },
                ].map((item) => (
                  <div key={item.label} className="p-3 bg-secondary/50 rounded-lg">
                    <div className="text-xs text-muted-foreground">{item.label}</div>
                    <div className="font-heading font-semibold text-sm">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Chart Placeholder */}
            <div className="glass rounded-xl p-6">
              <h2 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary" /> Price History</h2>
              <div className="h-48 rounded-lg bg-secondary/30 flex items-center justify-center text-muted-foreground text-sm">
                Price chart will be displayed here
              </div>
            </div>

            {/* Company Overview */}
            <div className="glass rounded-xl p-6">
              <h2 className="font-heading font-semibold text-lg mb-3">Company Overview</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This company operates in a high-growth sector with strong fundamentals and a proven business model.
                Detailed company overview, products & services, and industry analysis available after login.
              </p>
            </div>

            {/* Locked sections */}
            {["Research Report", "Financials", "Financial Ratios", "Shareholding Pattern"].map((section) => (
              <div key={section} className="glass rounded-xl p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  <span className="font-heading font-medium">{section}</span>
                </div>
                <Button variant="outline" size="sm" className="gap-1 text-xs border-border/50">
                  <Lock className="w-3 h-3" /> Login to View
                </Button>
              </div>
            ))}

            {/* Disclaimer */}
            <div className="glass rounded-xl p-6">
              <h3 className="font-heading font-semibold text-sm mb-2">Disclaimer</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The information provided is for educational purposes only. Investment in unlisted shares carries inherent risks.
                Please consult your financial advisor before making investment decisions. Past performance is not indicative of future results.
              </p>
            </div>
          </div>

          {/* Enquiry Form Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass rounded-xl p-6 sticky top-24">
              <h3 className="font-heading font-semibold text-lg mb-4">Post Enquiry</h3>

              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-2">
                  {["retail", "institutional"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setEnquiryType(t)}
                      className={`py-2 rounded-lg text-sm font-medium transition-all capitalize ${enquiryType === t ? "bg-primary/20 text-primary border border-primary/30" : "bg-secondary text-muted-foreground border border-transparent"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">Company</Label>
                  <Input value={companyName} readOnly className="mt-1 bg-secondary/50 border-border/50 text-sm" />
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">I want to</Label>
                  <Select value={action} onValueChange={setAction}>
                    <SelectTrigger className="mt-1 bg-secondary border-border/50 text-sm"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buy">Buy</SelectItem>
                      <SelectItem value="sell">Sell</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">Quantity</Label>
                  <Input type="number" placeholder="Enter quantity" className="mt-1 bg-secondary border-border/50 text-sm" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs text-muted-foreground">Min Price</Label>
                    <Input type="number" placeholder="₹ Min" className="mt-1 bg-secondary border-border/50 text-sm" />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Max Price</Label>
                    <Input type="number" placeholder="₹ Max" className="mt-1 bg-secondary border-border/50 text-sm" />
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">Name</Label>
                  <Input placeholder="Your name" className="mt-1 bg-secondary border-border/50 text-sm" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Email</Label>
                  <Input type="email" placeholder="your@email.com" className="mt-1 bg-secondary border-border/50 text-sm" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Mobile</Label>
                  <Input placeholder="+91 XXXXX XXXXX" className="mt-1 bg-secondary border-border/50 text-sm" />
                </div>

                {enquiryType === "institutional" && (
                  <div>
                    <Label className="text-xs text-muted-foreground">Company Name</Label>
                    <Input placeholder="Your company" className="mt-1 bg-secondary border-border/50 text-sm" />
                  </div>
                )}

                <div>
                  <Label className="text-xs text-muted-foreground">Additional Info</Label>
                  <Textarea placeholder="Any additional information..." className="mt-1 bg-secondary border-border/50 text-sm" rows={2} />
                </div>

                <div className="flex items-start gap-2">
                  <input type="checkbox" id="terms" className="mt-1 accent-primary" />
                  <label htmlFor="terms" className="text-xs text-muted-foreground">I agree to the Terms of Use and Disclaimer</label>
                </div>

                <Button className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 text-sm">Submit Enquiry</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CompanyDetail;
