import { ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: number;
  name: string;
  nameAr: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  isNew?: boolean;
  isSale?: boolean;
  viewMode: "grid" | "list";
}

const ProductCard = ({
  id,
  name,
  nameAr,
  price,
  originalPrice,
  image,
  category,
  rating,
  isNew,
  isSale,
  viewMode,
}: ProductCardProps) => {
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  if (viewMode === "list") {
    return (
      <Link to={`/products/${id}`} className="block bg-card rounded-2xl overflow-hidden card-hover border border-border flex flex-col sm:flex-row-reverse">
        <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
          {isNew && (
            <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
              جديد
            </span>
          )}
          {isSale && (
            <span className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1 rounded-full">
              -{discount}%
            </span>
          )}
        </div>
        <div className="flex-1 p-4 flex flex-col justify-between text-right">
          <div>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              {category}
            </span>
            <h3 className="font-display text-lg font-semibold text-foreground mt-1">
              {nameAr}
            </h3>
            <p className="text-sm text-muted-foreground">{name}</p>
            <div className="flex items-center justify-end gap-1 mt-2">
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
                <ShoppingCart className="w-4 h-4 ml-1" />
                أضف للسلة
              </Button>
              <Button size="sm" variant="ghost">
                <Heart className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-bold text-primary">
                {price.toLocaleString()} دج
              </span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {originalPrice.toLocaleString()} دج
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
          <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
            جديد
          </span>
        )}
        {isSale && (
          <span className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1 rounded-full">
            -{discount}%
          </span>
        )}
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
          <Button size="sm" variant="gold" className="flex-1">
            <ShoppingCart className="w-4 h-4 ml-1" />
            أضف للسلة
          </Button>
          <Button size="sm" variant="secondary">
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="p-4 text-right">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          {category}
        </span>
        <h3 className="font-display text-lg font-semibold text-foreground mt-1 line-clamp-1">
          {nameAr}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-1">{name}</p>
        <div className="flex items-center justify-end gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-sm ${i < rating ? "text-primary" : "text-muted"}`}
            >
              ★
            </span>
          ))}
        </div>
        <div className="flex items-center justify-end gap-2 mt-3">
          <span className="font-display text-xl font-bold text-primary">
            {price.toLocaleString()} دج
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {originalPrice.toLocaleString()} دج
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
