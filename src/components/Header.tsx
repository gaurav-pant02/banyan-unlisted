import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Screener", href: "/screener" },
  { label: "Companies", href: "/companies" },
  { label: "Investors", href: "/investors" },
  { label: "Sellers", href: "/sellers" },
  { label: "Search", href: "/search" },
  {
    label: "Refer",
    href: "/refer",
    children: [
      { label: "Become a Dealer/Franchise", href: "/refer#dealer" },
      { label: "As Individual", href: "/refer#individual" },
      { label: "FAQ", href: "/refer#faq" },
    ],
  },
  { label: "Blogs", href: "/blogs" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [referOpen, setReferOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center font-heading font-bold text-primary-foreground text-sm">
            B
          </div>
          <span className="font-heading font-bold text-lg text-foreground">
            Banyan <span className="text-gradient-primary">Unlisted</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setReferOpen(true)}
                onMouseLeave={() => setReferOpen(false)}
              >
                <button className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                  {item.label} <ChevronDown className="w-3 h-3" />
                </button>
                {referOpen && (
                  <div className="absolute top-full left-0 mt-1 w-56 glass rounded-lg py-2 shadow-card">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/search">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Search className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="ghost" className="text-sm text-muted-foreground hover:text-foreground">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="text-sm bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">
              Register
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden glass border-t border-border/30 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="block py-2 text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-2 border-t border-border/30">
            <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full text-sm">Login</Button>
            </Link>
            <Link to="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
              <Button className="w-full text-sm bg-gradient-primary text-primary-foreground">Register</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
