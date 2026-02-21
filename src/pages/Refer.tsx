import { Gift, Users, Building2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const referFaqs = [
  { q: "How does the referral program work?", a: "Share your unique referral link with friends. When they register and complete their first transaction, both you and your referral earn incentive points credited to your wallet." },
  { q: "What are the incentive points worth?", a: "Incentive points can be used towards your next transaction on Banyan Unlisted, reducing your transaction costs." },
  { q: "How do I become a dealer/franchise?", a: "Fill out the partner application form. Our team will review your application and get back to you within 48 hours with partnership details and commission structure." },
  { q: "Is there a limit to referrals?", a: "No! You can refer as many people as you like. There's no cap on the number of referrals or the incentives you can earn." },
];

const Refer = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Refer & <span className="text-gradient-gold">Earn</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Earn incentive points by referring friends and partners to Banyan Unlisted
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: Users, title: "Refer as Individual", desc: "Share your unique link, earn points when your referral completes their first transaction.", cta: "Get Referral Link" },
            { icon: Building2, title: "Become a Dealer/Franchise", desc: "Partner with us for higher commissions, dedicated support, and priority access to deals.", cta: "Apply as Partner" },
            { icon: Gift, title: "Earn Rewards", desc: "Both referrer and referee earn incentive points usable on the next transaction.", cta: "Learn More" },
          ].map((card) => (
            <div key={card.title} className="glass-hover rounded-xl p-6 text-center">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <card.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{card.desc}</p>
              <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90 text-sm">{card.cta}</Button>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div id="faq" className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-center mb-6 flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6 text-primary" /> Referral FAQ
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {referFaqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="glass rounded-xl border-border/30 px-6">
                <AccordionTrigger className="text-left font-heading font-medium hover:text-primary hover:no-underline py-4 text-sm">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-4">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Refer;
