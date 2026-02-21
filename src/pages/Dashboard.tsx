import { Link } from "react-router-dom";
import { BarChart3, Gift, Search, TrendingUp, Wallet, Share2, FileText, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const dashboardCards = [
  { icon: TrendingUp, title: "Portfolio", value: "₹12,45,000", desc: "Total portfolio value", color: "text-primary" },
  { icon: Wallet, title: "Wallet", value: "250 pts", desc: "Incentive points balance", color: "text-accent" },
  { icon: FileText, title: "Enquiries", value: "3 Active", desc: "Open enquiries", color: "text-primary" },
  { icon: Share2, title: "Referrals", value: "12", desc: "Successful referrals", color: "text-accent" },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-heading font-bold mb-1">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back, Investor</p>
          </div>
          <div className="flex gap-2">
            <Link to="/search">
              <Button variant="outline" size="sm" className="gap-1 border-border/50 text-sm"><Search className="w-4 h-4" /> Search</Button>
            </Link>
            <Link to="/refer">
              <Button size="sm" className="gap-1 bg-gradient-primary text-primary-foreground text-sm"><Gift className="w-4 h-4" /> Refer</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {dashboardCards.map((card) => (
            <div key={card.title} className="glass-hover rounded-xl p-5">
              <card.icon className={`w-5 h-5 ${card.color} mb-2`} />
              <div className="text-2xl font-heading font-bold">{card.value}</div>
              <div className="text-sm text-muted-foreground">{card.desc}</div>
            </div>
          ))}
        </div>

        {/* Referral Link */}
        <div className="glass rounded-xl p-6 mb-8">
          <h3 className="font-heading font-semibold mb-3 flex items-center gap-2"><Share2 className="w-5 h-5 text-primary" /> Your Referral Link</h3>
          <div className="flex gap-2">
            <div className="flex-1 bg-secondary rounded-lg px-4 py-2 text-sm text-muted-foreground truncate">
              https://banyanunlisted.com/ref/USER123
            </div>
            <Button size="sm" className="bg-gradient-primary text-primary-foreground shrink-0">Copy Link</Button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass rounded-xl p-6">
          <h3 className="font-heading font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { text: "Enquiry submitted for Swiggy Ltd", time: "2 hours ago", icon: FileText },
              { text: "Referral bonus credited: 50 pts", time: "1 day ago", icon: Gift },
              { text: "KYC verification completed", time: "3 days ago", icon: User },
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                <a.icon className="w-4 h-4 text-primary shrink-0" />
                <div className="flex-1">
                  <p className="text-sm">{a.text}</p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
