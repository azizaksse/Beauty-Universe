import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingCart, Heart, ChevronRight, Minus, Plus, Share2, Truck, Shield, RotateCcw } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { useLanguage } from "@/hooks/useLanguage";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { language, t, dir } = useLanguage();
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      id: product.id,
      name: product.name,
      nameAr: product.nameAr,
      nameFr: product.nameFr,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
    }, quantity);
    toast.success(t('cart.addedToCart'));
  };
  if (!product) {
    return (
      <div className="min-h-screen bg-background" dir={dir}>
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            {t('product.notFound')}
          </h1>
          <Link to="/products">
            <Button variant="gold">{t('product.backToCatalog')}</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const displayName = language === 'ar' ? product.nameAr : product.nameFr;
  const displayCategory = language === 'ar' ? product.categoryAr : product.categoryFr;

  // Generate multiple images for gallery (using same image for demo)
  const images = [product.image, product.image, product.image, product.image];

  // Related products (same category, excluding current)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // If not enough in same category, add others
  const moreRelated = products
    .filter((p) => p.id !== product.id && p.category !== product.category)
    .slice(0, 4 - relatedProducts.length);
  
  const allRelated = [...relatedProducts, ...moreRelated];

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const specifications = [
    { label: t('product.brand'), value: "Beauty Universe" },
    { label: t('product.category'), value: displayCategory },
    { label: t('product.productNumber'), value: `BU-${product.id.toString().padStart(4, "0")}` },
    { label: t('product.condition'), value: t('product.conditionNew') },
    { label: t('product.warrantyLabel'), value: t('product.warrantyValue') },
    { label: t('product.availability'), value: t('product.inStock') },
  ];

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <Header />

      {/* Breadcrumb */}
      <div className="bg-secondary py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              {t('nav.home')}
            </Link>
            <ChevronRight className={`w-4 h-4 text-muted-foreground ${dir === 'rtl' ? 'rotate-180' : ''}`} />
            <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">
              {t('nav.catalog')}
            </Link>
            <ChevronRight className={`w-4 h-4 text-muted-foreground ${dir === 'rtl' ? 'rotate-180' : ''}`} />
            <span className="text-foreground font-medium">{displayName}</span>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-card border border-border">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.isNew && (
                  <span className={`absolute top-4 ${dir === 'rtl' ? 'right-4' : 'left-4'} bg-primary text-primary-foreground text-sm font-bold px-4 py-2 rounded-full`}>
                    {t('product.new')}
                  </span>
                )}
                {product.isSale && (
                  <span className={`absolute top-4 ${dir === 'rtl' ? 'left-4' : 'right-4'} bg-destructive text-destructive-foreground text-sm font-bold px-4 py-2 rounded-full`}>
                    -{discount}%
                  </span>
                )}
              </div>
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <span className="text-sm text-primary font-medium uppercase tracking-wider">
                  {displayCategory}
                </span>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
                  {displayName}
                </h1>
                <p className="text-muted-foreground text-lg mt-1">{product.name}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${i < product.rating ? "text-primary" : "text-muted"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-muted-foreground">({product.rating} {t('product.outOf5')})</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4">
                <span className="font-display text-4xl font-bold text-primary">
                  {formatPrice(product.price)} {t('product.currency')}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)} {t('product.currency')}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {t('product.description')}
              </p>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center bg-card border border-border rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className={`p-3 hover:bg-secondary transition-colors ${dir === 'rtl' ? 'rounded-r-xl' : 'rounded-l-xl'}`}
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-6 py-3 font-medium text-lg min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className={`p-3 hover:bg-secondary transition-colors ${dir === 'rtl' ? 'rounded-l-xl' : 'rounded-r-xl'}`}
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <Button variant="gold" size="xl" className="flex-1 min-w-[200px]" onClick={handleAddToCart}>
                  <ShoppingCart className={`w-5 h-5 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                  {t('product.addToCart')}
                </Button>
                <Button variant="outline" size="icon" className="w-14 h-14">
                  <Heart className="w-6 h-6" />
                </Button>
                <Button variant="outline" size="icon" className="w-14 h-14">
                  <Share2 className="w-6 h-6" />
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Truck className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-foreground">{t('product.freeDelivery')}</p>
                    <p className="text-muted-foreground">{t('product.freeDeliveryDesc')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-foreground">{t('product.warranty')}</p>
                    <p className="text-muted-foreground">{t('product.warrantyDesc')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <RotateCcw className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-foreground">{t('product.easyReturn')}</p>
                    <p className="text-muted-foreground">{t('product.easyReturnDesc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            {t('product.specifications')}
          </h2>
          <div className="max-w-3xl mx-auto bg-card rounded-2xl border border-border overflow-hidden">
            {specifications.map((spec, idx) => (
              <div
                key={spec.label}
                className={`flex items-center justify-between px-6 py-4 ${
                  idx !== specifications.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <span className="font-medium text-foreground">{spec.label}</span>
                <span className="text-muted-foreground">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {allRelated.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                {t('product.relatedProducts')}
              </h2>
              <Link to="/products">
                <Button variant="gold-outline">{t('product.viewAll')}</Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {allRelated.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  nameAr={p.nameAr}
                  nameFr={p.nameFr}
                  price={p.price}
                  originalPrice={p.originalPrice}
                  image={p.image}
                  categoryAr={p.categoryAr}
                  categoryFr={p.categoryFr}
                  rating={p.rating}
                  isNew={p.isNew}
                  isSale={p.isSale}
                  viewMode="grid"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProductDetail;