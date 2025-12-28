import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { useCart } from "@/hooks/useCart";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Package, Truck, Home, Building2, MapPin, Phone, User, FileText, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const WILAYAS = [
  "01 - Adrar", "02 - Chlef", "03 - Laghouat", "04 - Oum El Bouaghi", "05 - Batna",
  "06 - Béjaïa", "07 - Biskra", "08 - Béchar", "09 - Blida", "10 - Bouira",
  "11 - Tamanrasset", "12 - Tébessa", "13 - Tlemcen", "14 - Tiaret", "15 - Tizi Ouzou",
  "16 - Alger", "17 - Djelfa", "18 - Jijel", "19 - Sétif", "20 - Saïda",
  "21 - Skikda", "22 - Sidi Bel Abbès", "23 - Annaba", "24 - Guelma", "25 - Constantine",
  "26 - Médéa", "27 - Mostaganem", "28 - M'Sila", "29 - Mascara", "30 - Ouargla",
  "31 - Oran", "32 - El Bayadh", "33 - Illizi", "34 - Bordj Bou Arréridj", "35 - Boumerdès",
  "36 - El Tarf", "37 - Tindouf", "38 - Tissemsilt", "39 - El Oued", "40 - Khenchela",
  "41 - Souk Ahras", "42 - Tipaza", "43 - Mila", "44 - Aïn Defla", "45 - Naâma",
  "46 - Aïn Témouchent", "47 - Ghardaïa", "48 - Relizane", "49 - El M'Ghair", "50 - El Meniaa",
  "51 - Ouled Djellal", "52 - Bordj Badji Mokhtar", "53 - Béni Abbès", "54 - Timimoun",
  "55 - Touggourt", "56 - Djanet", "57 - In Salah", "58 - In Guezzam"
];

const Checkout = () => {
  const { language, dir } = useLanguage();
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    wilaya: "",
    deliveryType: "home" as "home" | "stop_desk",
    address: "",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim() || !formData.wilaya) {
      toast.error(language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Veuillez remplir tous les champs requis');
      return;
    }

    if (items.length === 0) {
      toast.error(language === 'ar' ? 'السلة فارغة' : 'Le panier est vide');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('orders').insert({
        customer_name: formData.name.trim(),
        phone: formData.phone.trim(),
        wilaya: formData.wilaya,
        delivery_type: formData.deliveryType,
        address: formData.address.trim() || null,
        notes: formData.notes.trim() || null,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          name_ar: item.nameAr,
          price: item.price,
          quantity: item.quantity,
          image_url: item.image
        })),
        total_amount: totalPrice
      });

      if (error) throw error;

      setOrderSuccess(true);
      clearCart();
      toast.success(language === 'ar' ? 'تم إرسال طلبك بنجاح!' : 'Votre commande a été envoyée avec succès!');
    } catch (error) {
      console.error('Order error:', error);
      toast.error(language === 'ar' ? 'حدث خطأ أثناء إرسال الطلب' : 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-background" dir={dir}>
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              {language === 'ar' ? 'تم استلام طلبك!' : 'Commande reçue!'}
            </h1>
            <p className="text-muted-foreground mb-8">
              {language === 'ar' 
                ? 'سنتواصل معك قريباً لتأكيد الطلب والتوصيل'
                : 'Nous vous contacterons bientôt pour confirmer la commande et la livraison'}
            </p>
            <Button onClick={() => navigate('/')} className="w-full">
              {language === 'ar' ? 'العودة للرئيسية' : 'Retour à l\'accueil'}
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background" dir={dir}>
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
            <h1 className="font-display text-2xl font-bold text-foreground mb-4">
              {language === 'ar' ? 'السلة فارغة' : 'Panier vide'}
            </h1>
            <p className="text-muted-foreground mb-8">
              {language === 'ar' 
                ? 'أضف منتجات إلى السلة للمتابعة'
                : 'Ajoutez des produits au panier pour continuer'}
            </p>
            <Button onClick={() => navigate('/products')}>
              {language === 'ar' ? 'تصفح المنتجات' : 'Parcourir les produits'}
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
          {language === 'ar' ? 'إتمام الطلب' : 'Finaliser la commande'}
        </h1>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Order Form */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Truck className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display text-xl font-semibold text-foreground">
                {language === 'ar' ? 'معلومات التوصيل' : 'Informations de livraison'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  {language === 'ar' ? 'الاسم الكامل' : 'Nom complet'} *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Entrez votre nom complet'}
                  required
                  className="h-12"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  {language === 'ar' ? 'رقم الهاتف' : 'Numéro de téléphone'} *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0XXX XXX XXX"
                  required
                  className="h-12"
                  dir="ltr"
                />
              </div>

              {/* Wilaya */}
              <div className="space-y-2">
                <Label htmlFor="wilaya" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  {language === 'ar' ? 'الولاية' : 'Wilaya'} *
                </Label>
                <select
                  id="wilaya"
                  value={formData.wilaya}
                  onChange={(e) => setFormData({ ...formData, wilaya: e.target.value })}
                  required
                  className="w-full h-12 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">{language === 'ar' ? 'اختر الولاية' : 'Choisir la wilaya'}</option>
                  {WILAYAS.map((wilaya) => (
                    <option key={wilaya} value={wilaya}>{wilaya}</option>
                  ))}
                </select>
              </div>

              {/* Delivery Type */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-muted-foreground" />
                  {language === 'ar' ? 'نوع التوصيل' : 'Type de livraison'} *
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, deliveryType: 'home' })}
                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                      formData.deliveryType === 'home'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Home className={`w-6 h-6 ${formData.deliveryType === 'home' ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className={`text-sm font-medium ${formData.deliveryType === 'home' ? 'text-primary' : 'text-foreground'}`}>
                      {language === 'ar' ? 'توصيل للمنزل' : 'Livraison à domicile'}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, deliveryType: 'stop_desk' })}
                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                      formData.deliveryType === 'stop_desk'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Building2 className={`w-6 h-6 ${formData.deliveryType === 'stop_desk' ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className={`text-sm font-medium ${formData.deliveryType === 'stop_desk' ? 'text-primary' : 'text-foreground'}`}>
                      {language === 'ar' ? 'مكتب التوصيل' : 'Stop Desk'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Address (for home delivery) */}
              {formData.deliveryType === 'home' && (
                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    {language === 'ar' ? 'العنوان التفصيلي' : 'Adresse détaillée'}
                  </Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder={language === 'ar' ? 'الشارع، الحي، رقم المبنى...' : 'Rue, quartier, numéro...'}
                    rows={3}
                  />
                </div>
              )}

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  {language === 'ar' ? 'ملاحظات إضافية' : 'Notes supplémentaires'}
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={language === 'ar' ? 'أي ملاحظات خاصة بالطلب...' : 'Notes spéciales pour la commande...'}
                  rows={2}
                />
              </div>

              {/* COD Notice */}
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">💵</span>
                  </div>
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-200">
                      {language === 'ar' ? 'الدفع عند الاستلام' : 'Paiement à la livraison'}
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      {language === 'ar' ? 'ادفع نقداً عند استلام طلبك' : 'Payez en espèces à la réception'}
                    </p>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 text-lg font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting 
                  ? (language === 'ar' ? 'جاري الإرسال...' : 'Envoi en cours...')
                  : (language === 'ar' ? 'تأكيد الطلب' : 'Confirmer la commande')
                }
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm h-fit lg:sticky lg:top-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display text-xl font-semibold text-foreground">
                {language === 'ar' ? 'ملخص الطلب' : 'Résumé de la commande'}
              </h2>
            </div>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-16 h-16 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {language === 'ar' ? item.nameAr : item.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {language === 'ar' ? 'الكمية:' : 'Qté:'} {item.quantity}
                    </p>
                    <p className="text-sm font-semibold text-primary">
                      {(item.price * item.quantity).toLocaleString()} {language === 'ar' ? 'د.ج' : 'DA'}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">{language === 'ar' ? 'المجموع الفرعي' : 'Sous-total'}</span>
                <span className="font-medium">{totalPrice.toLocaleString()} {language === 'ar' ? 'د.ج' : 'DA'}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-muted-foreground">{language === 'ar' ? 'التوصيل' : 'Livraison'}</span>
                <span className="text-sm text-green-600 font-medium">
                  {language === 'ar' ? 'يُحدد لاحقاً' : 'À déterminer'}
                </span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <span className="font-display text-lg font-bold text-foreground">
                  {language === 'ar' ? 'الإجمالي' : 'Total'}
                </span>
                <span className="font-display text-2xl font-bold text-primary">
                  {totalPrice.toLocaleString()} {language === 'ar' ? 'د.ج' : 'DA'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;