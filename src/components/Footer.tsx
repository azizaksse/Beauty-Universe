import { Facebook, Instagram, MessageCircle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import logo from "@/assets/logo.png";

const Footer = () => {
  const { t, dir } = useLanguage();

  return (
    <footer id="contact" className="bg-foreground text-background py-12" dir={dir}>
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 text-center ${dir === 'rtl' ? 'md:text-right' : 'md:text-left'}`}>
          {/* Brand */}
          <div>
            <div className={`flex items-center gap-3 mb-4 justify-center ${dir === 'rtl' ? 'md:justify-end' : 'md:justify-start'}`}>
              <img src={logo} alt="Beauty Universe" className="h-12 w-12 rounded-full object-cover border-2 border-primary/30" />
              <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                <h3 className="font-display text-xl font-bold">Beauty Universe</h3>
                <p className="text-sm text-background/60">بيوتي يونيفرس</p>
              </div>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-background/70">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-primary transition-colors">
                  {t('nav.catalog')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  {t('footer.aboutUs')}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary transition-colors">
                  {t('nav.contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('footer.contactUs')}</h4>
            <div className={`flex gap-4 justify-center ${dir === 'rtl' ? 'md:justify-end' : 'md:justify-start'}`}>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-background/10 mt-10 pt-6 text-center">
          <p className="text-background/50 text-sm">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
