import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ar' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const translations = {
  ar: {
    // Header
    'nav.home': 'الرئيسية',
    'nav.catalog': 'الكتالوج',
    'nav.contact': 'اتصل بنا',
    'nav.search': 'بحث...',
    'nav.logout': 'خروج',
    'nav.login': 'تسجيل الدخول',
    'nav.dashboard': 'لوحة التحكم',
    
    // Hero
    'hero.badge': 'تشكيلة جديدة 2025',
    'hero.title': 'Beauty Universe - عالم الجمال في الجزائر',
    'hero.description': 'بيع وتوزيع معدات ومنتجات ومواد الحلاقة والتجميل ومستحضرات التجميل. توصيل لـ 58 ولاية.',
    'hero.cta': 'اكتشفي الآن',
    
    // Categories
    'categories.label': 'فئاتنا',
    'categories.title': 'اكتشفي عالم الجمال',
    'categories.barber': 'حلاقة',
    'categories.beauty': 'تجميل',
    'categories.cosmetics': 'مستحضرات تجميل',
    
    // Best Sellers
    'bestsellers.label': 'المفضلة',
    'bestsellers.title': 'الأكثر مبيعاً حالياً',
    'bestsellers.viewAll': 'عرض الكل',
    
    // Trust Badges
    'trust.delivery.title': 'توصيل 58 ولاية',
    'trust.delivery.description': 'شحن سريع والدفع عند الاستلام.',
    'trust.exchange.title': 'استبدال خلال 7 أيام',
    'trust.exchange.description': 'إمكانية الاستبدال خلال 7 أيام مع رسوم الإرجاع.',
    'trust.payment.title': 'الدفع عند الاستلام',
    'trust.payment.description': 'لا يوجد دفع عبر الإنترنت، كل شيء يتم عند التسليم.',
    
    // Reviews
    'reviews.title': 'آراء العملاء',
    'reviews.subtitle': 'ماذا يقول عملاؤنا عنا',
    'reviews.verified': 'عميل موثق',
    
    // Footer
    'footer.description': 'بيع وتوزيع معدات ومنتجات ومواد الحلاقة والتجميل ومستحضرات التجميل.',
    'footer.quickLinks': 'روابط سريعة',
    'footer.aboutUs': 'من نحن',
    'footer.contactUs': 'تواصل معنا',
    'footer.copyright': '© 2025 Beauty Universe. جميع الحقوق محفوظة.',
    
    // Auth
    'auth.login': 'تسجيل الدخول',
    'auth.signup': 'إنشاء حساب',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.welcome': 'مرحباً بك',
    'auth.welcomeBack': 'مرحباً بعودتك',
  },
  fr: {
    // Header
    'nav.home': 'Accueil',
    'nav.catalog': 'Catalogue',
    'nav.contact': 'Contact',
    'nav.search': 'Rechercher...',
    'nav.logout': 'Déconnexion',
    'nav.login': 'Connexion',
    'nav.dashboard': 'Tableau de bord',
    
    // Hero
    'hero.badge': 'Nouvelle Collection 2025',
    'hero.title': 'Beauty Universe - L\'univers de la beauté en Algérie',
    'hero.description': 'Vente et distribution d\'équipements, produits et matériels de coiffure, d\'esthétique et de cosmétiques. Livraison dans 58 wilayas.',
    'hero.cta': 'Découvrir maintenant',
    
    // Categories
    'categories.label': 'Nos Catégories',
    'categories.title': 'Découvrez l\'univers de la beauté',
    'categories.barber': 'Coiffure',
    'categories.beauty': 'Esthétique',
    'categories.cosmetics': 'Cosmétiques',
    
    // Best Sellers
    'bestsellers.label': 'Favoris',
    'bestsellers.title': 'Meilleures ventes actuelles',
    'bestsellers.viewAll': 'Voir tout',
    
    // Trust Badges
    'trust.delivery.title': 'Livraison 58 wilayas',
    'trust.delivery.description': 'Expédition rapide et paiement à la livraison.',
    'trust.exchange.title': 'Échange sous 7 jours',
    'trust.exchange.description': 'Possibilité d\'échange sous 7 jours avec frais de retour.',
    'trust.payment.title': 'Paiement à la livraison',
    'trust.payment.description': 'Pas de paiement en ligne, tout se fait à la livraison.',
    
    // Reviews
    'reviews.title': 'Avis Clients',
    'reviews.subtitle': 'Ce que nos clients disent de nous',
    'reviews.verified': 'Client vérifié',
    
    // Footer
    'footer.description': 'Vente et distribution d\'équipements, produits et matériels de coiffure, d\'esthétique et de cosmétiques.',
    'footer.quickLinks': 'Liens rapides',
    'footer.aboutUs': 'À propos',
    'footer.contactUs': 'Contactez-nous',
    'footer.copyright': '© 2025 Beauty Universe. Tous droits réservés.',
    
    // Auth
    'auth.login': 'Connexion',
    'auth.signup': 'Créer un compte',
    'auth.email': 'Email',
    'auth.password': 'Mot de passe',
    'auth.welcome': 'Bienvenue',
    'auth.welcomeBack': 'Bon retour',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'ar';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ar']] || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
