import { Facebook, Instagram, MapPin, Phone, Send } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  const { t, dir, language } = useLanguage();

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://facebook.com/beautyuniverse.dz",
      color: "hover:bg-[#1877F2]",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com/beautyuniverse.dz",
      color: "hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737]",
    },
    {
      name: "TikTok",
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      href: "https://tiktok.com/@beautyuniverse.dz",
      color: "hover:bg-[#000000]",
    },
    {
      name: "WhatsApp",
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      href: "https://wa.me/213000000000",
      color: "hover:bg-[#25D366]",
    },
    {
      name: "Telegram",
      icon: Send,
      href: "https://t.me/beautyuniverse_dz",
      color: "hover:bg-[#0088cc]",
    },
  ];

  return (
    <footer id="contact" className="bg-foreground text-background" dir={dir}>
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className={`flex items-center gap-3 mb-6 ${dir === 'rtl' ? 'flex-row' : 'flex-row'}`}>
              <img 
                src={logo} 
                alt="Beauty Universe" 
                className="h-14 w-14 rounded-full object-cover border-2 border-primary/50 shadow-lg shadow-primary/20" 
              />
              <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                <h3 className="font-display text-2xl font-bold text-background">Beauty Universe</h3>
                <p className="text-sm text-primary font-medium">بيوتي يونيفرس</p>
              </div>
            </Link>
            <p className={`text-background/70 text-sm leading-relaxed mb-6 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              {t('footer.description')}
            </p>
            {/* Social Icons */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full bg-background/10 border border-background/20 flex items-center justify-center ${social.color} hover:border-transparent transition-all duration-300 hover:scale-110`}
                    title={social.name}
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`font-display font-semibold text-lg mb-6 text-background relative inline-block ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              {t('footer.quickLinks')}
              <span className={`absolute -bottom-2 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-12 h-0.5 bg-primary rounded-full`} />
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className={`text-background/70 hover:text-primary transition-colors flex items-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse justify-end' : ''}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/products" className={`text-background/70 hover:text-primary transition-colors flex items-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse justify-end' : ''}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                  {t('nav.catalog')}
                </Link>
              </li>
              <li>
                <a href="#" className={`text-background/70 hover:text-primary transition-colors flex items-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse justify-end' : ''}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                  {t('footer.aboutUs')}
                </a>
              </li>
              <li>
                <a href="#contact" className={`text-background/70 hover:text-primary transition-colors flex items-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse justify-end' : ''}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                  {t('nav.contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className={`font-display font-semibold text-lg mb-6 text-background relative inline-block ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              {t('footer.contactUs')}
              <span className={`absolute -bottom-2 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-12 h-0.5 bg-primary rounded-full`} />
            </h4>
            <ul className="space-y-4">
              <li className={`flex items-start gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                  <p className="text-background/70 text-sm leading-relaxed">
                    {language === 'ar' ? 'الجزائر العاصمة، الجزائر' : 'Alger, Algérie'}
                  </p>
                </div>
              </li>
              <li>
                <a 
                  href="tel:+213000000000" 
                  className={`flex items-center gap-3 hover:text-primary transition-colors ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
                >
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-background/70 text-sm" dir="ltr">+213 XXX XXX XXX</p>
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/213000000000"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className={`flex items-center gap-3 hover:text-primary transition-colors ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
                >
                  <div className="w-9 h-9 rounded-full bg-[#25D366]/20 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#25D366]">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <p className="text-background/70 text-sm">
                    {language === 'ar' ? 'تواصل عبر واتساب' : 'Contactez via WhatsApp'}
                  </p>
                </a>
              </li>
            </ul>
            
            {/* WhatsApp CTA Button */}
            <a
              href="https://wa.me/213000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {language === 'ar' ? 'راسلنا على واتساب' : 'Nous contacter sur WhatsApp'}
            </a>
          </div>

          {/* Hours */}
          <div>
            <h4 className={`font-display font-semibold text-lg mb-6 text-background relative inline-block ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              {language === 'ar' ? 'ساعات العمل' : 'Horaires'}
              <span className={`absolute -bottom-2 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-12 h-0.5 bg-primary rounded-full`} />
            </h4>
            <div className="bg-background/5 border border-background/10 rounded-xl p-5">
              <div className="space-y-3 text-sm">
                <div className={`flex justify-between items-center ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <span className="text-background/70">{language === 'ar' ? 'السبت - الخميس' : 'Sam - Jeu'}</span>
                  <span className="text-background font-medium">9:00 - 18:00</span>
                </div>
                <div className={`flex justify-between items-center ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <span className="text-background/70">{language === 'ar' ? 'الجمعة' : 'Vendredi'}</span>
                  <span className="text-primary font-medium">{language === 'ar' ? 'مغلق' : 'Fermé'}</span>
                </div>
              </div>
            </div>
            
            {/* Delivery Info */}
            <div className="mt-4 bg-primary/10 border border-primary/20 rounded-xl p-4">
              <p className="text-background/90 text-sm font-medium text-center">
                🚚 {language === 'ar' ? 'توصيل لـ 69 ولاية' : 'Livraison 69 wilayas'}
              </p>
              <p className="text-background/60 text-xs text-center mt-1">
                {language === 'ar' ? 'الدفع عند الاستلام' : 'Paiement à la livraison'}
              </p>
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