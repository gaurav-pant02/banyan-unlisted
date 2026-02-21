import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "What are Unlisted Companies?",
    a: "Unlisted companies are those companies that are not traded or listed on any recognized stock exchange (like NSE or BSE). These companies are typically owned by founders, employees, private investors, or closely held by the company.",
  },
  {
    q: "What are Unlisted Shares?",
    a: "Unlisted shares are equity shares of companies that are not traded on any recognized stock exchange. Their transactions occur in the over-the-counter (OTC) market.",
  },
  {
    q: "Why should I consider investing in Unlisted Shares?",
    a: "Investing in unlisted shares offers the potential for significant capital gains, especially if the company is in a high-growth phase and later goes public (IPO) or gets acquired. It provides early access to promising companies before they hit the public market.",
  },
  {
    q: "What are the main risks associated with Unlisted Shares?",
    a: "The primary risks include illiquidity, lack of transparency, and valuation challenges. There's also the risk that the company may never go public or may not perform as expected.",
  },
  {
    q: "How is the price of Unlisted Shares determined?",
    a: "Unlike listed shares, unlisted share prices are determined through negotiation between buyers and sellers, influenced by financial performance, industry outlook, growth potential, and market sentiment.",
  },
  {
    q: "How can I buy Unlisted Shares in India?",
    a: "You can buy through specialized intermediaries like Banyan Unlisted. The process involves identifying a company, completing KYC, agreeing on a price, transferring funds, and having shares credited to your Demat account.",
  },
  {
    q: "Can I sell my Unlisted Shares?",
    a: "Yes, unlisted shares can be sold through specialized brokers or platforms, or directly to another interested buyer. Liquidity is more limited than listed shares.",
  },
  {
    q: "What are the tax implications in India?",
    a: "If held ≤24 months, gains are STCG taxed per income tax slab. If held >24 months, gains are LTCG taxed at 20% with indexation benefits.",
  },
  {
    q: "What documents are required?",
    a: "You need PAN card, Aadhaar card, Client Master List (CML) from your Demat account, and a cancelled cheque or bank statement.",
  },
  {
    q: "What role does Banyan Tree Capital Advisory Services play?",
    a: "We offer specialized expertise in the unlisted shares market, providing in-house research, due diligence, fair valuation, and connecting buyers with sellers through our extensive network.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Frequently Asked <span className="text-gradient-gold">Questions</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Everything you need to know about unlisted shares and investing
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="glass rounded-xl border-border/30 px-6">
                <AccordionTrigger className="text-left font-heading font-medium text-foreground hover:text-primary hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
