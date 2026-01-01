import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Truck, Shield, RotateCcw, Loader2, User, Phone, MapPin, Zap, Home, Building2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";
import { useLanguage } from "@/hooks/useLanguage";
import { formatPrice } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { resolveProductGalleryUrls, resolveProductMainImageUrl } from "@/integrations/supabase/storage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const WILAYAS = [
  "01 Adrar", "02 Chlef", "03 Laghouat", "04 Oum El Bouaghi", "05 Batna",
  "06 Béjaïa", "07 Biskra", "08 Béchar", "09 Blida", "10 Bouira",
  "11 Tamanrasset", "12 Tébessa", "13 Tlemcen", "14 Tiaret", "15 Tizi Ouzou",
  "16 Alger", "17 Djelfa", "18 Jijel", "19 Sétif", "20 Saïda",
  "21 Skikda", "22 Sidi Bel Abbès", "23 Annaba", "24 Guelma", "25 Constantine",
  "26 Médéa", "27 Mostaganem", "28 M'Sila", "29 Mascara", "30 Ouargla",
  "31 Oran", "32 El Bayadh", "33 Illizi", "34 Bordj Bou Arreridj", "35 Boumerdès",
  "36 El Tarf", "37 Tindouf", "38 Tissemsilt", "39 El Oued", "40 Khenchela",
  "41 Souk Ahras", "42 Tipaza", "43 Mila", "44 Aïn Defla", "45 Naâma",
  "46 Aïn Témouchent", "47 Ghardaïa", "48 Relizane", "49 Timimoun", "50 Bordj Badji Mokhtar",
  "51 Ouled Djellal", "52 Béni Abbès", "53 In Salah", "54 In Guezzam", "55 Touggourt",
  "56 Djanet", "57 El M'Ghair", "58 El Meniaa", "59 Aflou", "60 Barika",
  "61 El Kantara", "62 Bir El Ater", "63 El Aricha", "64 Ksar Chellala", "65 Aïn Oussara",
  "66 Messaâd", "67 Ksar El Boukhari", "68 Bou Saâda", "69 El Abiodh Sidi Cheikh"
];

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadWilaya, setLeadWilaya] = useState("69 El Abiodh Sidi Cheikh");
  const [leadCity, setLeadCity] = useState("");
  const [deliveryType, setDeliveryType] = useState<"home" | "stop_desk">("home");
  const { language, t, dir } = useLanguage();

  const fetchRelatedProducts = useCallback(async (category: string, excludeId: string) => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .eq("is_active", true)
      .neq("id", excludeId)
      .limit(4);

    if (data && data.length > 0) {
      const resolved = await Promise.all(
        data.map(async (item) => ({
          ...item,
          image_url: await resolveProductMainImageUrl(item.image_url, item.main_image_path),
        }))
      );
      setRelatedProducts(resolved);
    } else {
      const { data: otherData } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .neq("id", excludeId)
        .limit(4);
      const resolved = otherData
        ? await Promise.all(
          otherData.map(async (item) => ({
            ...item,
            image_url: await resolveProductMainImageUrl(item.image_url, item.main_image_path),
          }))
        )
        : [];
      setRelatedProducts(resolved);
    }
  }, []);

  const fetchProduct = useCallback(async (productId: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .eq("is_active", true)
      .maybeSingle();

    if (!error && data) {
      const resolvedImageUrl = await resolveProductMainImageUrl(data.image_url, data.main_image_path);
      const resolvedGallery = await resolveProductGalleryUrls(data.gallery_image_paths);
      setProduct({ ...data, image_url: resolvedImageUrl });
      setGalleryImages(resolvedGallery);
      fetchRelatedProducts(data.category, productId);
    } else {
      setProduct(null);
    }
    setLoading(false);
  }, [fetchRelatedProducts]);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id, fetchProduct]);

  const handleWhatsAppOrder = () => {
    if (!product) return;

    if (!leadName.trim() || !leadPhone.trim()) {
      toast.error(language === 'ar' ? 'يرجى إدخال الاسم ورقم الهاتف' : 'Veuillez entrer votre nom et numéro de téléphone');
      return;
    }

    const productName = language === 'ar' ? product.name_ar : product.name;
    const deliveryMethodText = deliveryType === 'home'
      ? (language === 'ar' ? 'توصيل للمنزل' : 'Livraison à domicile')
      : (language === 'ar' ? 'مكتب التوصيل' : 'Stop Desk');

    let message = `طلب جديد:\nالمنتج: ${productName}\nالاسم: ${leadName}\nالهاتف: ${leadPhone}\nالولاية: ${leadWilaya}\nالمدينة: ${leadCity}\nنوع التوصيل: ${deliveryMethodText}\nالكمية: ${quantity}\nالسعر الإجمالي: ${formatPrice(product.price * quantity)} ${t('product.currency')}`;

    const url = `https://wa.me/213771514101?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background" dir={dir}>
        <Header />
        <div className="container mx-auto px-4 py-20 flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

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

  const displayName = language === 'ar' ? product.name_ar : product.name;
  const displayCategory = language === 'ar' ? product.category_ar : product.category;

  const placeholderImage = "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop";
  const mainImage = product.image_url || placeholderImage;
  const images = galleryImages.length > 0 ? [mainImage, ...galleryImages] : [mainImage];

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  const specifications = [
    { label: t('product.brand'), value: "Beauty Universe" },
    { label: t('product.category'), value: displayCategory },
    { label: t('product.productNumber'), value: `BU-${product.id.slice(0, 8).toUpperCase()}` },
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
          {/* Centered Title & Price */}
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              {displayName}
            </h1>
            <div className="text-2xl md:text-3xl font-bold text-primary">
              {t('product.currency')} {formatPrice(product.price)}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column: Image Gallery */}
            <div className="space-y-6">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-card border border-border shadow-md">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.is_new && (
                  <span className={`absolute top-6 ${dir === 'rtl' ? 'right-6' : 'left-6'} bg-primary text-primary-foreground text-sm font-bold px-4 py-2 rounded-full shadow-lg`}>
                    {t('product.new')}
                  </span>
                )}
                {product.is_sale && (
                  <span className={`absolute top-6 ${dir === 'rtl' ? 'left-6' : 'right-6'} bg-destructive text-destructive-foreground text-sm font-bold px-4 py-2 rounded-full shadow-lg`}>
                    -{discount}%
                  </span>
                )}
              </div>
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={cn(
                      "aspect-square rounded-2xl overflow-hidden border-2 transition-all shadow-sm",
                      selectedImage === idx
                        ? "border-primary ring-4 ring-primary/10"
                        : "border-transparent hover:border-primary/30"
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Product Info & Order Button */}
            <div className="space-y-8">
              <div className="bg-card rounded-3xl border border-border p-6 md:p-8 shadow-sm">
                <div className="mb-8">
                  <h3 className="font-bold text-xl mb-4 text-foreground">{t('product.description')}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {(language === 'ar' ? product.description_ar : product.description) || t('product.description')}
                  </p>
                </div>

                <div className="bg-card rounded-3xl border border-border p-6 md:p-8 shadow-lg">
                  <h3 className="text-center text-2xl font-bold mb-6 text-foreground">
                    {language === 'ar' ? 'معلومات الطلب' : 'Informations de commande'}
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className={`text-sm font-medium text-foreground/70 block ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                        {language === 'ar' ? 'الإسم الكامل' : 'Nom Complet'}
                      </Label>
                      <div className="relative">
                        <User className={`absolute ${dir === 'rtl' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground`} />
                        <Input
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          placeholder={language === 'ar' ? 'الإسم الكامل' : 'Nom Complet'}
                          className={`${dir === 'rtl' ? 'pr-10 text-right' : 'pl-10 text-left'} h-12 bg-secondary/30 border-none rounded-xl`}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className={`text-sm font-medium text-foreground/70 block ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                        {language === 'ar' ? 'الهاتف' : 'Téléphone'}
                      </Label>
                      <div className="relative">
                        <Phone className={`absolute ${dir === 'rtl' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground`} />
                        <Input
                          type="tel"
                          value={leadPhone}
                          onChange={(e) => setLeadPhone(e.target.value)}
                          placeholder="0678610457"
                          className={`${dir === 'rtl' ? 'pr-10 text-right' : 'pl-10 text-left'} h-12 bg-secondary/30 border-none rounded-xl`}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className={`text-sm font-medium text-foreground/70 block ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                        {language === 'ar' ? 'الولاية' : 'Wilaya'}
                      </Label>
                      <div className="relative">
                        <MapPin className={`absolute ${dir === 'rtl' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground`} />
                        <select
                          value={leadWilaya}
                          onChange={(e) => setLeadWilaya(e.target.value)}
                          className={`w-full h-12 ${dir === 'rtl' ? 'pr-10 text-right' : 'pl-10 text-left'} bg-secondary/30 border-none rounded-xl appearance-none focus:ring-2 focus:ring-primary/50 outline-none`}
                        >
                          <option value="">{language === 'ar' ? 'اختر الولاية' : 'Choisir la wilaya'}</option>
                          {WILAYAS.map((wilaya) => (
                            <option key={wilaya} value={wilaya}>{wilaya}</option>
                          ))}
                        </select>
                      </div>
                      {/* City */}
                      <div className="space-y-2 mt-4">
                        <Label className={`text-sm font-medium text-foreground/70 block ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                          {language === 'ar' ? 'المدينة' : 'City'}
                        </Label>
                        <div className="relative">
                          <MapPin className={`absolute ${dir === 'rtl' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground`} />
                          <Input
                            value={leadCity}
                            onChange={(e) => setLeadCity(e.target.value)}
                            placeholder={language === 'ar' ? 'المدينة' : 'City'}
                            className={`${dir === 'rtl' ? 'pr-10 text-right' : 'pl-10 text-left'} h-12 bg-secondary/30 border-none rounded-xl`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Delivery Type */}
                    <div className="space-y-3">
                      <Label className={`text-sm font-medium text-foreground/70 block ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                        {language === 'ar' ? 'نوع التوصيل' : 'Type de livraison'}
                      </Label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setDeliveryType('home')}
                          className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${deliveryType === 'home'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                            }`}
                        >
                          <Home className={`w-6 h-6 ${deliveryType === 'home' ? 'text-primary' : 'text-muted-foreground'}`} />
                          <span className={`text-sm font-medium ${deliveryType === 'home' ? 'text-primary' : 'text-foreground'}`}>
                            {language === 'ar' ? 'توصيل للمنزل' : 'Livraison à domicile'}
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeliveryType('stop_desk')}
                          className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${deliveryType === 'stop_desk'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                            }`}
                        >
                          <Building2 className={`w-6 h-6 ${deliveryType === 'stop_desk' ? 'text-primary' : 'text-muted-foreground'}`} />
                          <span className={`text-sm font-medium ${deliveryType === 'stop_desk' ? 'text-primary' : 'text-foreground'}`}>
                            {language === 'ar' ? 'مكتب التوصيل' : 'Stop Desk'}
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className={`text-sm font-medium text-foreground/70 block ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                        {language === 'ar' ? 'الكمية' : 'Quantité'}
                      </Label>
                      <Input
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                        className="h-12 bg-secondary/30 border-none rounded-xl text-center"
                      />
                    </div>

                    {/* Summary Box */}
                    <div className="bg-secondary/50 rounded-2xl p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{language === 'ar' ? 'سعر المنتج' : 'Prix du produit'}</span>
                        <span>{formatPrice(product.price)} {t('product.currency')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{language === 'ar' ? 'التوصيل' : 'Livraison'}</span>
                        <span className="text-green-600 font-medium">{language === 'ar' ? 'يحدد لاحقاً' : 'À confirmer'}</span>
                      </div>
                      <div className="pt-2 border-t border-border flex justify-between font-bold text-lg">
                        <span>{language === 'ar' ? 'الإجمالي' : 'Total'}</span>
                        <span className="text-primary">{formatPrice(product.price * quantity)} {t('product.currency')}</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleWhatsAppOrder}
                      className="w-full h-16 text-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 mt-4"
                    >
                      <Zap className="w-6 h-6" />
                      {language === 'ar' ? 'اطلب الآن عبر واتساب' : 'Commander via WhatsApp'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Truck className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-xs">
                    <p className="font-medium text-foreground">{t('product.freeDelivery')}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-xs">
                    <p className="font-medium text-foreground">{t('product.warranty')}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <RotateCcw className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-xs">
                    <p className="font-medium text-foreground">{t('product.easyReturn')}</p>
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
          <div className="max-w-3xl mx-auto bg-card rounded-2xl border border-border overflow-hidden card-3d">
            {specifications.map((spec, idx) => (
              <div
                key={spec.label}
                className={`flex items-center justify-between px-6 py-4 ${idx !== specifications.length - 1 ? "border-b border-border" : ""
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
      {relatedProducts.length > 0 && (
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
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  nameAr={p.name_ar}
                  price={p.price}
                  originalPrice={p.original_price}
                  image={p.image_url}
                  categoryAr={p.category_ar}
                  categoryFr={p.category}
                  rating={p.rating}
                  isNew={p.is_new}
                  isSale={p.is_sale}
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
