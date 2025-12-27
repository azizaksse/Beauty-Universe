import { Facebook, Instagram, MessageCircle, MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  const { t, dir, language } = useLanguage();

  return (
    <footer id="contact" className="bg-foreground text-background" dir={dir}>
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className={`${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            <div className={`flex items-center gap-3 mb-6 ${dir === 'rtl' ? 'justify-start flex-row-reverse' : 'justify-start'}`}>
              <img 
                src={logo} 
                alt="Beauty Universe" 
                className="h-14 w-14 rounded-full object-cover border-2 border-primary/50 shadow-lg shadow-primary/20" 
              />
              <div>
                <h3 className="font-display text-2xl font-bold text-background">Beauty Universe</h3>
                <p className="text-sm text-primary font-medium">بيوتي يونيفرس</p>
              </div>
            </div>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            {/* Social Icons */}
            <div className={`flex gap-3 ${dir === 'rtl' ? 'justify-start' : 'justify-start'}`}>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 border border-background/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 border border-background/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 border border-background/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={`${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            <h4 className="font-display font-semibold text-lg mb-6 text-background relative inline-block">
              {t('footer.quickLinks')}
              <span className={`absolute -bottom-2 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-12 h-0.5 bg-primary rounded-full`} />
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-background/70 hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-background/70 hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                  {t('nav.catalog')}
                </Link>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                  {t('footer.aboutUs')}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-background/70 hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                  {t('nav.contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={`${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            <h4 className="font-display font-semibold text-lg mb-6 text-background relative inline-block">
              {t('footer.contactUs')}
              <span className={`absolute -bottom-2 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-12 h-0.5 bg-primary rounded-full`} />
            </h4>
            <ul className="space-y-4">
              <li className={`flex items-start gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-background/70 text-sm leading-relaxed">
                    {language === 'ar' ? 'الجزائر العاصمة، الجزائر' : 'Alger, Algérie'}
                  </p>
                </div>
              </li>
              <li className={`flex items-center gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <p className="text-background/70 text-sm" dir="ltr">+213 XXX XXX XXX</p>
              </li>
              <li className={`flex items-center gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <p className="text-background/70 text-sm">contact@beautyuniverse.dz</p>
              </li>
            </ul>
          </div>

          {/* Newsletter / Hours */}
          <div className={`${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            <h4 className="font-display font-semibold text-lg mb-6 text-background relative inline-block">
              {language === 'ar' ? 'ساعات العمل' : 'Horaires'}
              <span className={`absolute -bottom-2 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-12 h-0.5 bg-primary rounded-full`} />
            </h4>
            <div className="bg-background/5 border border-background/10 rounded-xl p-5">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-background/70">{language === 'ar' ? 'السبت - الخميس' : 'Sam - Jeu'}</span>
                  <span className="text-background font-medium">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-background/70">{language === 'ar' ? 'الجمعة' : 'Vendredi'}</span>
                  <span className="text-primary font-medium">{language === 'ar' ? 'مغلق' : 'Fermé'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className={`flex flex-col md:flex-row items-center justify-between gap-4 ${dir === 'rtl' ? 'md:flex-row-reverse' : ''}`}>
            <p className="text-background/50 text-sm">
              {t('footer.copyright')}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-background/30 text-xs">
                {language === 'ar' ? 'صنع بـ' : 'Fait avec'}
              </span>
              <span className="text-primary">♥</span>
              <span className="text-background/30 text-xs">
                {language === 'ar' ? 'في الجزائر' : 'en Algérie'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;