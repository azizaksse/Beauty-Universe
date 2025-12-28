import { ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  id: number;
  name: string;
  nameAr: string;
  nameFr: string;
  price: number;
  originalPrice?: number;
  image: string;
  categoryAr: string;
  categoryFr: string;
  rating: number;
  isNew?: boolean;
  isSale?: boolean;
  viewMode: "grid" | "list";
}

const ProductCard = ({
  id,
  name,
  nameAr,
  nameFr,
  price,
  originalPrice,
  image,
  categoryAr,
  categoryFr,
  rating,
  isNew,
  isSale,
  viewMode,
}: ProductCardProps) => {
  const { language, t, dir } = useLanguage();
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const displayName = language === 'ar' ? nameAr : nameFr;
  const displayCategory = language === 'ar' ? categoryAr : categoryFr;

  if (viewMode === "list") {
    return (
      <Link to={`/products/${id}`} className={`block bg-card rounded-2xl overflow-hidden card-hover border border-border flex flex-col sm:flex-row${dir === 'rtl' ? '-reverse' : ''}`}>
        <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
          <img
            src={image}
            alt={name}
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
                  className={`text-sm ${i < rating ? "text-primary" : "text-muted"}`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-2">
              <Button size="sm" variant="gold">
                <ShoppingCart className={`w-4 h-4 ${dir === 'rtl' ? 'ml-1' : 'mr-1'}`} />
                {t('product.addToCart')}
              </Button>
              <Button size="sm" variant="ghost">
                <Heart className="w-4 h-4" />
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
    <Link to={`/products/${id}`} className="block bg-card rounded-2xl overflow-hidden card-hover border border-border group">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
          <Button size="sm" variant="gold" className="flex-1">
            <ShoppingCart className={`w-4 h-4 ${dir === 'rtl' ? 'ml-1' : 'mr-1'}`} />
            {t('product.addToCart')}
          </Button>
          <Button size="sm" variant="secondary">
            <Heart className="w-4 h-4" />
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
              className={`text-sm ${i < rating ? "text-primary" : "text-muted"}`}
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