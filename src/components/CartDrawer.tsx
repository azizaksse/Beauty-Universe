import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/hooks/useCart";
import { useLanguage } from "@/hooks/useLanguage";
import { formatPrice } from "@/lib/utils";

const CartDrawer = () => {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice, isOpen, setIsOpen } = useCart();
  const { language, t, dir } = useLanguage();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side={dir === 'rtl' ? 'left' : 'right'} className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            {t('cart.title')} ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">{t('cart.empty')}</p>
            <Button variant="gold" onClick={() => setIsOpen(false)} asChild>
              <Link to="/products">{t('cart.continueShopping')}</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => {
                const displayName = language === 'ar' ? item.nameAr : item.nameFr;
                return (
                  <div key={item.id} className="flex gap-4 bg-card rounded-xl p-3 border border-border">
                    <Link to={`/products/${item.id}`} onClick={() => setIsOpen(false)}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link 
                        to={`/products/${item.id}`} 
                        onClick={() => setIsOpen(false)}
                        className="font-medium text-foreground hover:text-primary transition-colors line-clamp-1"
                      >
                        {displayName}
                      </Link>
                      <p className="text-sm text-muted-foreground line-clamp-1">{item.name}</p>
                      <p className="text-primary font-bold mt-1">
                        {formatPrice(item.price)} {t('product.currency')}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1 bg-secondary rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-background rounded-l-lg transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-3 text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-background rounded-r-lg transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t('cart.subtotal')}</span>
                <span className="font-display text-xl font-bold text-primary">
                  {formatPrice(totalPrice)} {t('product.currency')}
                </span>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                {t('cart.shippingNote')}
              </p>
              <div className="grid gap-2">
                <Button variant="gold" size="lg" className="w-full">
                  {t('cart.checkout')}
                </Button>
                <Button variant="outline" size="sm" onClick={clearCart} className="w-full">
                  <Trash2 className="w-4 h-4 mr-2" />
                  {t('cart.clearCart')}
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
