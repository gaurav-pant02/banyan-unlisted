import { BarChart3, ShieldCheck, Users, Handshake } from "lucide-react";

const services = [
  {
    icon: BarChart3,
    title: "Pre-IPO Advisory",
    description: "Expert guidance on pre-IPO investments with in-depth research and fair valuation of unlisted companies.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Transactions",
    description: "End-to-end secure share transfers via NSDL/CDSL demat accounts with complete documentation support.",
  },
  {
    icon: Users,
    title: "Institutional Solutions",
    description: "Tailored solutions for institutional investors including bulk deals, M&A advisory, and strategic partnerships.",
  },
  {
    icon: Handshake,
    title: "Capital Advisory",
    description: "We work across sectors helping companies meet capital requirements through M&A, strategic partnerships, or JVs.",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Our <span className="text-gradient-primary">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Comprehensive solutions for the unlisted shares market
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div key={s.title} className="glass-hover rounded-xl p-6 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
