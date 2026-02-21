const steps = [
  { step: "01", title: "Register & KYC", description: "Create your account and complete eKYC verification via Aadhaar & PAN through DigiLocker." },
  { step: "02", title: "Research & Select", description: "Browse our screener, access research reports, and identify high-potential unlisted companies." },
  { step: "03", title: "Place Enquiry", description: "Submit your buy/sell enquiry with quantity and price expectations. Our team connects you with counterparties." },
  { step: "04", title: "Complete Transaction", description: "Secure payment and demat transfer. Shares credited to your account with full documentation." },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            How It <span className="text-gradient-primary">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Start investing in unlisted shares in 4 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.step} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-border to-transparent z-0" />
              )}
              <div className="glass-hover rounded-xl p-6 relative z-10">
                <div className="text-4xl font-heading font-bold text-gradient-primary mb-4">{s.step}</div>
                <h3 className="font-heading font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
