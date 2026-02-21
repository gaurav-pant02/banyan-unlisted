import { CheckCircle2 } from "lucide-react";

const reasons = [
  "SEBI-aware processes with complete regulatory compliance",
  "In-house research team with deep market expertise",
  "Transparent pricing with no hidden fees",
  "Secure demat transfers via NSDL/CDSL",
  "10,000+ satisfied investors across India",
  "Dedicated relationship managers for institutional clients",
];

const WhyChooseSection = () => {
  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Why Choose <span className="text-gradient-gold">Banyan Unlisted</span>?
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Backed by Banyan Tree Capital Advisory Services, we bring decades of financial expertise to help you navigate the unlisted shares market with confidence.
            </p>
            <ul className="space-y-4">
              {reasons.map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-foreground">{r}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
            <div className="relative space-y-6">
              {[
                { label: "Companies Covered", value: "500+", bar: 85 },
                { label: "Successful Transactions", value: "15,000+", bar: 92 },
                { label: "Client Satisfaction", value: "98%", bar: 98 },
                { label: "Cities Served", value: "50+", bar: 70 },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                    <span className="text-sm font-heading font-bold text-foreground">{stat.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-primary transition-all duration-1000" style={{ width: `${stat.bar}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
