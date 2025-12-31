import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { AnimatedSection } from "@/hooks/useScrollAnimation";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/data/products";
import { ProductCardSkeleton } from "@/components/Skeleton";
import { formatPrice } from "@/lib/utils";
import { resolveProductMainImageUrl } from "@/integrations/supabase/storage";

const BestSellers = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, dir, language } = useLanguage();

  useEffect(() => {
    fetchBestSellers();
  }, []);

  const fetchBestSellers = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(3);

    if (!error && data) {
      const resolved = await Promise.all(
        data.map(async (product) => ({
          ...product,
          image_url: await resolveProductMainImageUrl(product.image_url, product.main_image_path),
        }))
      );
      setProducts(resolved);
    }
    setLoading(false);
  };

  const placeholderImage = "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop";

  return (
    <section className="py-16 md:py-24 bg-background" dir={dir}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <AnimatedSection animation="fade-up" className={`flex items-center justify-between mb-12 ${dir === 'rtl' ? 'flex-row' : 'flex-row-reverse'}`}>
          <Link to="/products">
            <Button variant="outline" className="btn-outline-gold rounded-full px-6 hover:scale-105 transition-transform">
              {t('bestsellers.viewAll')}
            </Button>
          </Link>

          <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
            <span className="text-primary text-sm font-medium">{t('bestsellers.label')}</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-1">
              {t('bestsellers.title')}
            </h2>
          </div>
        </AnimatedSection>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[...Array(3)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{language === 'ar' ? 'لا توجد منتجات بعد' : 'Aucun produit disponible'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.map((product, index) => (
              <AnimatedSection
                key={product.id}
                animation="fade-up"
                delay={index * 150}
              >
                <Link
                  to={`/products/${product.id}`}
                  className="group block bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 card-hover card-3d"
                >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-secondary">
                  <img
                    src={product.image_url || placeholderImage}
                    alt={language === 'ar' ? product.name_ar : product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button 
                    onClick={(e) => e.preventDefault()}
                    className={`absolute top-4 ${dir === 'rtl' ? 'right-4' : 'left-4'} w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-background transition-all`}
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                  {product.is_new && (
                    <span className={`absolute top-4 ${dir === 'rtl' ? 'left-4' : 'right-4'} bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full`}>
                      {language === 'ar' ? 'جديد' : 'Nouveau'}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className={`p-5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                  <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-1">
                    {language === 'ar' ? product.name_ar : product.name}
                  </h3>
                  <p className="text-primary font-bold text-xl">
                    {formatPrice(product.price)} {language === 'ar' ? 'دج' : 'DA'}
                  </p>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSellers;
