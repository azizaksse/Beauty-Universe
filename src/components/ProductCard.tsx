import { useState } from "react";
import { Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  originalPrice?: number | null;
  image: string | null;
  categoryAr: string;
  categoryFr: string;
  rating: number | null;
  isNew?: boolean | null;
  isSale?: boolean | null;
  viewMode: "grid" | "list";
}

const ProductCard = ({
  id,
  name,
  nameAr,
  price,
  originalPrice,
  image,
  categoryAr,
  categoryFr,
  rating = 5,
  isNew,
  isSale,
  viewMode,
}: ProductCardProps) => {
  const { language, t, dir } = useLanguage();
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const displayName = language === 'ar' ? nameAr : name;
  const displayCategory = language === 'ar' ? categoryAr : categoryFr;
  const productRating = rating || 5;

  const [imageLoaded, setImageLoaded] = useState(false);
  const placeholderImage = "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop";
  const displayImage = image || placeholderImage;

  if (viewMode === "list") {
    return (
      <Link to={`/products/${id}`} className={`block bg-card rounded-2xl overflow-hidden card-hover card-3d border border-border flex flex-col sm:flex-row${dir === 'rtl' ? '-reverse' : ''}`}>
        <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 bg-secondary">
          <img
            src={displayImage}
            alt={name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          {isNew && (
            <span className={`absolute top-3 ${dir === 'rtl' ? 'right-3' : 'left-3'} bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full`}>
              {t('product.new')}
            </span>
          )}
          {isSale && (
            <span className={`absolute top-3 ${dir === 'rtl' ? 'left-3' : 'right-3'} bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1 rounded-full`}>
              -{discount}%
            </span>
          )}
        </div>
        <div className={`flex-1 p-4 flex flex-col justify-between ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          <div>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              {displayCategory}
            </span>
            <h3 className="font-display text-lg font-semibold text-foreground mt-1">
              {displayName}
            </h3>
            <p className="text-sm text-muted-foreground">{name}</p>
            <div className={`flex items-center gap-1 mt-2 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-sm ${i < productRating ? "text-primary" : "text-muted"}`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-2">
              <Button size="sm" variant="gold">
                <Zap className={`w-4 h-4 ${dir === 'rtl' ? 'ml-1' : 'mr-1'}`} />
                {language === 'ar' ? 'اطلب الآن' : 'Commander'}
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-bold text-primary">
                {formatPrice(price)} {t('product.currency')}
              </span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(originalPrice)} {t('product.currency')}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/products/${id}`} className="block bg-card rounded-2xl overflow-hidden card-hover card-3d border border-border group transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden bg-secondary">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-secondary">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
          </div>
        )}
        <img
          src={displayImage}
          alt={name}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {isNew && (
          <span className={`absolute top-3 ${dir === 'rtl' ? 'right-3' : 'left-3'} bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full`}>
            {t('product.new')}
          </span>
        )}
        {isSale && (
          <span className={`absolute top-3 ${dir === 'rtl' ? 'left-3' : 'right-3'} bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1 rounded-full`}>
            -{discount}%
          </span>
        )}
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
          <Button size="sm" variant="gold" className="w-full">
            <Zap className={`w-4 h-4 ${dir === 'rtl' ? 'ml-1' : 'mr-1'}`} />
            {language === 'ar' ? 'اطلب الآن' : 'Commander'}
          </Button>
        </div>
      </div>
      <div className={`p-4 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          {displayCategory}
        </span>
        <h3 className="font-display text-lg font-semibold text-foreground mt-1 line-clamp-1">
          {displayName}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-1">{name}</p>
        <div className={`flex items-center gap-1 mt-2 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-sm ${i < productRating ? "text-primary" : "text-muted"}`}
            >
              ★
            </span>
          ))}
        </div>
        <div className={`flex items-center gap-2 mt-3 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
          <span className="font-display text-xl font-bold text-primary">
            {formatPrice(price)} {t('product.currency')}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(originalPrice)} {t('product.currency')}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
