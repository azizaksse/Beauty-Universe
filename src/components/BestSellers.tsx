import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import barberChair from "@/assets/barber-chair.jpg";
import ledMirror from "@/assets/led-mirror.jpg";
import cosmetics from "@/assets/cosmetics.jpg";

const products = [
  {
    id: 1,
    name_ar: "كرسي حلاقة ثيودور",
    name_fr: "Fauteuil de barbier Theodore",
    price: "85,000 د.ج",
    image: barberChair,
  },
  {
    id: 2,
    name_ar: "مرآة ذكية LED",
    name_fr: "Miroir intelligent LED",
    price: "45,000 د.ج",
    image: ledMirror,
  },
  {
    id: 3,
    name_ar: "طقم مستحضرات التجميل",
    name_fr: "Kit de cosmétiques",
    price: "25,000 د.ج",
    image: cosmetics,
  },
];

const BestSellers = () => {
  const { t, dir, language } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-background" dir={dir}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`flex items-center justify-between mb-12 ${dir === 'rtl' ? 'flex-row' : 'flex-row-reverse'}`}>
          <Button variant="outline" className="btn-outline-gold rounded-full px-6">
            {t('bestsellers.viewAll')}
          </Button>

          <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
            <span className="text-primary text-sm font-medium">{t('bestsellers.label')}</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-1">
              {t('bestsellers.title')}
            </h2>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 card-hover animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-secondary">
                <img
                  src={product.image}
                  alt={language === 'ar' ? product.name_ar : product.name_fr}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button className={`absolute top-4 ${dir === 'rtl' ? 'right-4' : 'left-4'} w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-background transition-all`}>
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              {/* Details */}
              <div className={`p-5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {language === 'ar' ? product.name_ar : product.name_fr}
                </h3>
                <p className="text-primary font-bold text-xl">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
