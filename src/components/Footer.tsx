import { Link } from "react-router-dom";
import { Linkedin, Twitter, Instagram, Facebook, MessageCircle, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/30 bg-card/40">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center font-heading font-bold text-primary-foreground text-sm">B</div>
              <span className="font-heading font-bold text-lg">Banyan <span className="text-gradient-primary">Unlisted</span></span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              India's trusted platform for unlisted & pre-IPO shares. Powered by Banyan Tree Capital Advisory Services.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Facebook, href: "#" },
                { icon: MessageCircle, href: "#" },
                { icon: Send, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a key={i} href={href} className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* About Us */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4 text-foreground">About Us</h4>
            <ul className="space-y-2">
              {["About", "Retail", "Institutional", "Help"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4 text-foreground">Resources</h4>
            <ul className="space-y-2">
              {[
                { label: "Unlisted Blog", href: "/blogs" },
                { label: "IPO Blog", href: "/blogs" },
                { label: "News", href: "/blogs" },
                { label: "FAQ", href: "#faq" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4 text-foreground">Legal</h4>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Use", "Disclaimer", "Risk Factors"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4 text-foreground">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Mumbai, Maharashtra, India</li>
              <li>+91 XXXXX XXXXX</li>
              <li>info@banyanunlisted.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/30 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Banyan Tree Capital Advisory Services. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
