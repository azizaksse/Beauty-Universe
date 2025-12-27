import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "الرئيسية", href: "#" },
    { label: "الكتالوج", href: "#categories" },
    { label: "اتصل بنا", href: "#contact" },
  ];

  return (
    <header className="bg-background/95 backdrop-blur-sm sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-display font-bold text-xl">BU</span>
            </div>
            <div className="text-right">
              <h1 className="font-display text-xl font-bold text-foreground">
                Beauty Universe
              </h1>
              <p className="text-xs text-muted-foreground">بيوتي يونيفرس</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <button className="font-bold text-foreground">AR</button>
              <span className="text-muted-foreground">|</span>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                FR
              </button>
            </div>

            {/* Search */}
            <div className="hidden md:flex items-center gap-2 bg-secondary rounded-full px-4 py-2">
              <input
                type="text"
                placeholder="...Search"
                className="bg-transparent outline-none text-sm w-32 text-right placeholder:text-muted-foreground"
              />
              <Search className="w-4 h-4 text-muted-foreground" />
            </div>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-5 h-5" />
            </Button>

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-foreground hover:text-primary transition-colors font-medium text-right"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center justify-end gap-2 text-sm pt-2">
                <button className="font-bold text-foreground">AR</button>
                <span className="text-muted-foreground">|</span>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  FR
                </button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
