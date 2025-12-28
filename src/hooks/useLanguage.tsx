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
    // Announcement Bar
    'announcement.welcome': 'مرحبا بكم التوصيل متوفر',
    'announcement.wilayas': 'ولاية والدفع عند الاستلام',
    
    // Header
    'nav.home': 'الرئيسية',
    'nav.catalog': 'الكتالوج',
    'nav.contact': 'اتصل بنا',
    'nav.search': 'بحث...',
    'nav.logout': 'خروج',
    'nav.login': 'تسجيل الدخول',
    'nav.dashboard': 'لوحة التحكم',
    
    // Hero
    'hero.badge': 'تشكيلة جديدة 2026',
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
    'trust.delivery.title': 'توصيل 69 ولاية',
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
    'footer.copyright': '© 2026 Beauty Universe. جميع الحقوق محفوظة.',
    
    // Auth
    'auth.login': 'تسجيل الدخول',
    'auth.signup': 'إنشاء حساب',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.welcome': 'مرحباً بك',
    'auth.welcomeBack': 'مرحباً بعودتك',

    // Products Page
    'products.title': 'كتالوج المنتجات',
    'products.subtitle': 'اكتشف مجموعتنا الواسعة من معدات الصالون ومستحضرات التجميل الاحترافية',
    'products.search': 'ابحث عن منتج...',
    'products.filters': 'الفلاتر',
    'products.categories': 'الفئات',
    'products.priceRange': 'نطاق السعر',
    'products.from': 'من',
    'products.to': 'إلى',
    'products.quickFilters': 'فلاتر سريعة',
    'products.newProducts': 'منتجات جديدة',
    'products.specialOffers': 'عروض خاصة',
    'products.topRated': 'الأعلى تقييماً',
    'products.noResults': 'لا توجد منتجات مطابقة لبحثك',
    'products.resetFilters': 'إعادة تعيين الفلاتر',
    'products.sortBy': 'ترتيب حسب',
    'products.sortDefault': 'الترتيب الافتراضي',
    'products.sortPriceAsc': 'السعر: من الأقل للأعلى',
    'products.sortPriceDesc': 'السعر: من الأعلى للأقل',
    'products.sortRating': 'التقييم',
    'products.sortNewest': 'الأحدث',
    'products.product': 'منتج',

    // Product Card
    'product.new': 'جديد',
    'product.addToCart': 'أضف للسلة',
    'product.currency': 'دج',

    // Product Detail
    'product.notFound': 'المنتج غير موجود',
    'product.backToCatalog': 'العودة للكتالوج',
    'product.outOf5': 'من 5',
    'product.description': 'منتج عالي الجودة من Beauty Universe. مصمم لتلبية احتياجات صالونات التجميل الاحترافية. يتميز بالمتانة والأداء الممتاز مع ضمان لمدة سنة كاملة.',
    'product.freeDelivery': 'توصيل مجاني',
    'product.freeDeliveryDesc': 'للطلبات +50,000 دج',
    'product.warranty': 'ضمان سنة',
    'product.warrantyDesc': 'ضمان الجودة',
    'product.easyReturn': 'إرجاع سهل',
    'product.easyReturnDesc': 'خلال 14 يوم',
    'product.specifications': 'المواصفات',
    'product.brand': 'العلامة التجارية',
    'product.category': 'الفئة',
    'product.productNumber': 'رقم المنتج',
    'product.condition': 'الحالة',
    'product.conditionNew': 'جديد',
    'product.warrantyLabel': 'الضمان',
    'product.warrantyValue': 'سنة واحدة',
    'product.availability': 'التوفر',
    'product.inStock': 'متوفر في المخزون',
    'product.relatedProducts': 'منتجات ذات صلة',
    'product.viewAll': 'عرض الكل',
  },
  fr: {
    // Announcement Bar
    'announcement.welcome': 'Bienvenue ! Livraison disponible dans',
    'announcement.wilayas': 'wilayas avec paiement à la livraison',
    
    // Header
    'nav.home': 'Accueil',
    'nav.catalog': 'Catalogue',
    'nav.contact': 'Contact',
    'nav.search': 'Rechercher...',
    'nav.logout': 'Déconnexion',
    'nav.login': 'Connexion',
    'nav.dashboard': 'Tableau de bord',
    
    // Hero
    'hero.badge': 'Nouvelle Collection 2026',
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
    'trust.delivery.title': 'Livraison 69 wilayas',
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
    'footer.copyright': '© 2026 Beauty Universe. Tous droits réservés.',
    
    // Auth
    'auth.login': 'Connexion',
    'auth.signup': 'Créer un compte',
    'auth.email': 'Email',
    'auth.password': 'Mot de passe',
    'auth.welcome': 'Bienvenue',
    'auth.welcomeBack': 'Bon retour',

    // Products Page
    'products.title': 'Catalogue de Produits',
    'products.subtitle': 'Découvrez notre large gamme d\'équipements de salon et de cosmétiques professionnels',
    'products.search': 'Rechercher un produit...',
    'products.filters': 'Filtres',
    'products.categories': 'Catégories',
    'products.priceRange': 'Fourchette de prix',
    'products.from': 'De',
    'products.to': 'À',
    'products.quickFilters': 'Filtres rapides',
    'products.newProducts': 'Nouveaux produits',
    'products.specialOffers': 'Offres spéciales',
    'products.topRated': 'Les mieux notés',
    'products.noResults': 'Aucun produit ne correspond à votre recherche',
    'products.resetFilters': 'Réinitialiser les filtres',
    'products.sortBy': 'Trier par',
    'products.sortDefault': 'Tri par défaut',
    'products.sortPriceAsc': 'Prix : croissant',
    'products.sortPriceDesc': 'Prix : décroissant',
    'products.sortRating': 'Note',
    'products.sortNewest': 'Plus récent',
    'products.product': 'produit',

    // Product Card
    'product.new': 'Nouveau',
    'product.addToCart': 'Ajouter au panier',
    'product.currency': 'DA',

    // Product Detail
    'product.notFound': 'Produit non trouvé',
    'product.backToCatalog': 'Retour au catalogue',
    'product.outOf5': 'sur 5',
    'product.description': 'Produit de haute qualité de Beauty Universe. Conçu pour répondre aux besoins des salons de beauté professionnels. Se distingue par sa durabilité et ses excellentes performances avec une garantie d\'un an.',
    'product.freeDelivery': 'Livraison gratuite',
    'product.freeDeliveryDesc': 'Pour commandes +50 000 DA',
    'product.warranty': 'Garantie 1 an',
    'product.warrantyDesc': 'Garantie qualité',
    'product.easyReturn': 'Retour facile',
    'product.easyReturnDesc': 'Sous 14 jours',
    'product.specifications': 'Spécifications',
    'product.brand': 'Marque',
    'product.category': 'Catégorie',
    'product.productNumber': 'Numéro de produit',
    'product.condition': 'État',
    'product.conditionNew': 'Neuf',
    'product.warrantyLabel': 'Garantie',
    'product.warrantyValue': 'Un an',
    'product.availability': 'Disponibilité',
    'product.inStock': 'En stock',
    'product.relatedProducts': 'Produits similaires',
    'product.viewAll': 'Voir tout',
  },
};

const GLOBAL_LANGUAGE_CONTEXT_KEY = "__beauty_universe_language_context__";

const globalForLanguage = globalThis as unknown as Record<string, unknown>;

const LanguageContext =
  (globalForLanguage[GLOBAL_LANGUAGE_CONTEXT_KEY] as
    | React.Context<LanguageContextType | undefined>
    | undefined) ?? createContext<LanguageContextType | undefined>(undefined);

globalForLanguage[GLOBAL_LANGUAGE_CONTEXT_KEY] = LanguageContext;

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

export default useLanguage;
