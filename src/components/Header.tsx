import { Search, Menu, X, UserCog } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";

import logo from "@/assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();
  const { language, setLanguage, t, dir } = useLanguage();


  const scrollToContact = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: t('nav.home'), href: "/", isHash: false },
    { label: t('nav.catalog'), href: "/products", isHash: false },
    { label: t('nav.contact'), href: "/#contact", isHash: true },
  ];

  return (
    <header className="bg-background/95 backdrop-blur-sm sticky top-0 z-50 border-b border-border" dir={dir}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Beauty Universe" className="h-12 w-12 rounded-full object-cover border-2 border-primary/30 shadow-md" />
            <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
              <h1 className="font-display text-xl font-bold text-foreground hidden sm:block">
                Beauty Universe
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">بيوتي يونيفرس</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isHash ? (
                <button
                  key={link.label}
                  onClick={scrollToContact}
                  className={`transition-colors font-medium text-foreground hover:text-primary`}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`transition-colors font-medium ${location.pathname === link.href
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                    }`}
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <button
                onClick={() => setLanguage('ar')}
                className={language === 'ar' ? "font-bold text-foreground" : "text-muted-foreground hover:text-foreground transition-colors"}
              >
                AR
              </button>
              <span className="text-muted-foreground">|</span>
              <button
                onClick={() => setLanguage('fr')}
                className={language === 'fr' ? "font-bold text-foreground" : "text-muted-foreground hover:text-foreground transition-colors"}
              >
                FR
              </button>
            </div>

            {/* Search */}
            <div className="hidden md:flex items-center gap-2 bg-secondary rounded-full px-4 py-2">
              <input
                type="text"
                placeholder={t('nav.search')}
                className={`bg-transparent outline-none text-sm w-32 placeholder:text-muted-foreground ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
              />
              <Search className="w-4 h-4 text-muted-foreground" />
            </div>



            {/* Admin Panel - Only for admins */}
            {user && isAdmin && (
              <Link to="/admin" className="hidden md:block">
                <Button variant="ghost" size="icon" title={t('nav.dashboard')}>
                  <UserCog className="w-5 h-5" />
                </Button>
              </Link>
            )}

            {/* Logout button for logged in users */}
            {user && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut()}
                className="hidden md:flex text-muted-foreground hover:text-foreground"
              >
                {t('nav.logout')}
              </Button>
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
                link.isHash ? (
                  <button
                    key={link.label}
                    onClick={() => {
                      scrollToContact();
                      setIsMenuOpen(false);
                    }}
                    className={`transition-colors font-medium ${dir === 'rtl' ? 'text-right' : 'text-left'} text-foreground hover:text-primary`}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`transition-colors font-medium ${dir === 'rtl' ? 'text-right' : 'text-left'} ${location.pathname === link.href
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              ))}

              {/* Mobile Auth */}
              {user ? (
                <>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className={`text-foreground hover:text-primary font-medium ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('nav.dashboard')}
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className={`text-muted-foreground hover:text-foreground font-medium ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                  >
                    {t('nav.logout')}
                  </button>
                </>
              ) : null}

              <div className={`flex items-center gap-2 text-sm pt-2 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                <button
                  onClick={() => setLanguage('ar')}
                  className={language === 'ar' ? "font-bold text-foreground" : "text-muted-foreground hover:text-foreground transition-colors"}
                >
                  AR
                </button>
                <span className="text-muted-foreground">|</span>
                <button
                  onClick={() => setLanguage('fr')}
                  className={language === 'fr' ? "font-bold text-foreground" : "text-muted-foreground hover:text-foreground transition-colors"}
                >
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
