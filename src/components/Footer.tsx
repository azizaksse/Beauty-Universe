import { Facebook, Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
          {/* Brand */}
          <div>
            <div className="flex items-center justify-center md:justify-end gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-display font-bold text-xl">BU</span>
              </div>
              <div className="text-right">
                <h3 className="font-display text-xl font-bold">Beauty Universe</h3>
                <p className="text-sm text-background/60">بيوتي يونيفرس</p>
              </div>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              بيع وتوزيع معدات ومنتجات ومواد الحلاقة والتجميل ومستحضرات التجميل.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-background/70">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-primary transition-colors">
                  الكتالوج
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  من نحن
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary transition-colors">
                  اتصل بنا
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">تواصل معنا</h4>
            <div className="flex gap-4 justify-center md:justify-end">
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
            © 2025 Beauty Universe. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
