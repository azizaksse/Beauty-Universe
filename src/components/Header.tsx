import { ShoppingCart, Search, Menu, X, User, Settings } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  const navLinks = [
    { label: "الرئيسية", href: "/" },
    { label: "الكتالوج", href: "/products" },
    { label: "اتصل بنا", href: "/#contact" },
  ];

  return (
    <header className="bg-background/95 backdrop-blur-sm sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Beauty Universe" className="h-12 w-12 rounded-full object-cover" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`transition-colors font-medium ${
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
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

            {/* Auth */}
            {user ? (
              <div className="hidden md:flex items-center gap-2">
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="ghost" size="icon">
                      <Settings className="w-5 h-5" />
                    </Button>
                  </Link>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut()}
                  className="text-muted-foreground hover:text-foreground"
                >
                  خروج
                </Button>
              </div>
            ) : (
              <Link to="/auth" className="hidden md:block">
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            )}

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
                <Link
                  key={link.label}
                  to={link.href}
                  className={`transition-colors font-medium text-right ${
                    location.pathname === link.href
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Auth */}
              {user ? (
                <>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="text-foreground hover:text-primary font-medium text-right"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      لوحة التحكم
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="text-muted-foreground hover:text-foreground font-medium text-right"
                  >
                    تسجيل الخروج
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="text-foreground hover:text-primary font-medium text-right"
                  onClick={() => setIsMenuOpen(false)}
                >
                  تسجيل الدخول
                </Link>
              )}

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
