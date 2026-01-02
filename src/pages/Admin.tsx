import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  Search,
  LogOut,
  LayoutDashboard,
  ChevronRight,
  Save,
  X,
  ImagePlus,
  Upload,
  Loader2,
  ShoppingCart,
  CheckCircle2,
  Clock,
  Truck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { normalizeProductImageValue, resolveProductGalleryUrls, resolveProductMainImageUrl } from "@/integrations/supabase/storage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  id: string;
  name: string;
  name_ar: string;
  description: string | null;
  description_ar: string | null;
  price: number;
  original_price: number | null;
  category: string;
  category_ar: string;
  image_url: string | null;
  main_image_path: string | null;
  gallery_image_paths: string[] | null;
  rating: number | null;
  is_new: boolean | null;
  is_sale: boolean | null;
  is_active: boolean | null;
  stock: number | null;
  created_at: string;
}

interface OrderItem {
  name: string;
  name_ar: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  customer_name: string;
  phone: string;
  wilaya: string;
  delivery_type: string;
  address: string | null;
  notes: string | null;
  items: OrderItem[];
  total_amount: number;
  status: string;
  created_at: string;
}

const categories = [
  { id: "chairs", label: "كراسي الحلاقة", labelEn: "Barber Chairs" },
  { id: "mirrors", label: "المرايا", labelEn: "Mirrors" },
  { id: "cosmetics", label: "مستحضرات التجميل", labelEn: "Cosmetics" },
  { id: "tools", label: "أدوات الحلاقة", labelEn: "Barber Tools" },
  { id: "furniture", label: "الأثاث", labelEn: "Furniture" },
  { id: "accessories", label: "الإكسسوارات", labelEn: "Accessories" },
];

const emptyProduct = {
  name: "",
  name_ar: "",
  description: "",
  description_ar: "",
  price: 0,
  original_price: null as number | null,
  category: "chairs",
  category_ar: "كراسي الحلاقة",
  image_url: "",
  main_image_path: "",
  gallery_image_paths: [] as string[],
  rating: 5,
  is_new: false,
  is_sale: false,
  is_active: true,
  stock: 0,
};

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signOut } = useAuth();
  console.log("Admin component rendering");

  useEffect(() => {
    console.log("Admin component mounted");
  }, []);

  const [activeTab, setActiveTab] = useState<"products" | "orders">("products");

  // Products State
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<typeof emptyProduct & { id?: string }>(emptyProduct);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleteAllConfirm, setDeleteAllConfirm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Orders State
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "adminbu") {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      toast({ title: "تم تسجيل الدخول بنجاح" });
    } else {
      toast({
        title: "خطأ",
        description: "كلمة المرور غير صحيحة",
        variant: "destructive",
      });
    }
  };

  const fetchProducts = useCallback(async () => {
    setLoadingProducts(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "خطأ",
        description: "فشل في تحميل المنتجات",
        variant: "destructive",
      });
    } else {
      const resolved = data
        ? await Promise.all(
          data.map(async (product) => ({
            ...product,
            image_url: await resolveProductMainImageUrl(product.image_url, product.main_image_path),
          }))
        )
        : [];
      setProducts(resolved);
    }
    setLoadingProducts(false);
  }, [toast]);

  const fetchOrders = useCallback(async () => {
    setLoadingOrders(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل الطلبات",
        variant: "destructive",
      });
    } else {
      // Cast the items to OrderItem[] since Supabase returns them as JSON
      const parsedOrders = (data || []).map(order => ({
        ...order,
        items: order.items as unknown as OrderItem[]
      }));
      setOrders(parsedOrders);
    }
    setLoadingOrders(false);
  }, [toast]);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, [fetchProducts, fetchOrders]);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);

    if (error) {
      toast({
        title: "خطأ",
        description: "فشل في تحديث حالة الطلب",
        variant: "destructive",
      });
    } else {
      toast({ title: "تم تحديث الحالة بنجاح" });
      fetchOrders();
    }
  };

  const handleSave = async () => {
    if (!editingProduct.name || !editingProduct.name_ar || !editingProduct.price) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    const productData = {
      name: editingProduct.name,
      name_ar: editingProduct.name_ar,
      description: editingProduct.description || null,
      description_ar: editingProduct.description_ar || null,
      price: editingProduct.price,
      original_price: editingProduct.original_price || null,
      category: editingProduct.category,
      category_ar: editingProduct.category_ar,
      image_url: normalizeProductImageValue(editingProduct.main_image_path) || null,
      main_image_path: normalizeProductImageValue(editingProduct.main_image_path) || null,
      gallery_image_paths: (editingProduct.gallery_image_paths || []).map((path) =>
        normalizeProductImageValue(path)
      ),
      rating: editingProduct.rating || 5,
      is_new: editingProduct.is_new || false,
      is_sale: editingProduct.is_sale || false,
      is_active: editingProduct.is_active ?? true,
      stock: editingProduct.stock || 0,
    };

    if (editingProduct.id) {
      // Update
      const { error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", editingProduct.id);

      if (error) {
        console.error("Update product error:", error);
        toast({
          title: "خطأ",
          description: "فشل في تحديث المنتج",
          variant: "destructive",
        });
      } else {
        toast({ title: "تم التحديث بنجاح" });
        fetchProducts();
        setIsDialogOpen(false);
      }
    } else {
      // Insert
      const { error } = await supabase.from("products").insert(productData);

      if (error) {
        console.error("Insert product error:", error);
        toast({
          title: "خطأ",
          description: "فشل في إضافة المنتج",
          variant: "destructive",
        });
      } else {
        toast({ title: "تمت الإضافة بنجاح" });
        fetchProducts();
        setIsDialogOpen(false);
      }
    }

    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      console.error("Delete product error:", error);
      toast({
        title: "خطأ",
        description: `فشل في حذف المنتج: ${error.message}`,
        variant: "destructive",
      });
    } else {
      toast({ title: "تم الحذف بنجاح" });
      fetchProducts();
    }
    setDeleteConfirmId(null);
  };

  const handleDeleteAll = async () => {
    const { error } = await supabase.from("products").delete().neq("id", "00000000-0000-0000-0000-000000000000");

    if (error) {
      console.error("Delete all products error:", error);
      toast({
        title: "خطأ",
        description: `فشل في حذف جميع المنتجات: ${error.message}`,
        variant: "destructive",
      });
    } else {
      toast({ title: "تم حذف جميع المنتجات بنجاح" });
      fetchProducts();
    }
    setDeleteAllConfirm(false);
  };

  const openEditDialog = (product?: Product) => {
    if (product) {
      setEditingProduct({
        id: product.id,
        name: product.name,
        name_ar: product.name_ar,
        description: product.description || "",
        description_ar: product.description_ar || "",
        price: product.price,
        original_price: product.original_price,
        category: product.category,
        category_ar: product.category_ar,
        image_url: product.image_url || "",
        main_image_path: product.main_image_path || "",
        gallery_image_paths: product.gallery_image_paths || [],
        rating: product.rating || 5,
        is_new: product.is_new || false,
        is_sale: product.is_sale || false,
        is_active: product.is_active ?? true,
        stock: product.stock || 0,
      });
    } else {
      setEditingProduct({ ...emptyProduct });
    }
    setIsDialogOpen(true);
  };

  const updateImagePreviews = useCallback(async () => {
    const mainUrl = await resolveProductMainImageUrl(
      editingProduct.image_url || null,
      editingProduct.main_image_path || null
    );
    const galleryUrls = await resolveProductGalleryUrls(editingProduct.gallery_image_paths || []);
    setMainImagePreview(mainUrl);
    setGalleryPreviews(galleryUrls);
  }, [editingProduct.image_url, editingProduct.main_image_path, editingProduct.gallery_image_paths]);

  useEffect(() => {
    updateImagePreviews();
  }, [updateImagePreviews]);

  const handleCategoryChange = (categoryId: string) => {
    const cat = categories.find((c) => c.id === categoryId);
    setEditingProduct({
      ...editingProduct,
      category: categoryId,
      category_ar: cat?.label || "",
    });
  };

  const uploadToStorage = async (file: File) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filePath, file);

    if (uploadError) throw uploadError;
    return filePath;
  };

  const validateImageFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "???",
        description: "???? ?????? ??? ???? ????",
        variant: "destructive",
      });
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "???",
        description: "??? ?????? ??? ?? ???? ??? ?? 5 ????????",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !validateImageFile(file)) return;

    setIsUploading(true);
    try {
      const filePath = await uploadToStorage(file);
      setEditingProduct({ ...editingProduct, main_image_path: filePath });
      toast({ title: "?? ??? ?????? ?????" });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "???",
        description: "??? ?? ??? ??????",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleGalleryImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const invalidFile = files.find((file) => !validateImageFile(file));
    if (invalidFile) return;

    setIsUploading(true);
    try {
      const uploadedPaths = [] as string[];
      for (const file of files) {
        const filePath = await uploadToStorage(file);
        uploadedPaths.push(filePath);
      }
      setEditingProduct({
        ...editingProduct,
        gallery_image_paths: [...(editingProduct.gallery_image_paths || []), ...uploadedPaths],
      });
      toast({ title: "?? ??? ?????? ?????" });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "???",
        description: "??? ?? ??? ??????",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (galleryInputRef.current) {
        galleryInputRef.current.value = "";
      }
    }
  };

  const handleExit = async () => {
    sessionStorage.removeItem("admin_auth");
    await signOut();
    navigate("/", { replace: true });
  };

  const filteredProducts = products.filter((p) => {
    const query = searchQuery.toLowerCase();
    return (
      (p.name || "").toLowerCase().includes(query) ||
      (p.name_ar || "").includes(searchQuery)
    );
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'confirmed': return 'bg-blue-100 text-blue-700';
      case 'shipped': return 'bg-purple-100 text-purple-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'قيد الانتظار';
      case 'confirmed': return 'تم التأكيد';
      case 'shipped': return 'تم الشحن';
      case 'delivered': return 'تم التوصيل';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center p-4" dir="rtl">
        <div className="w-full max-w-md bg-card rounded-3xl border border-border p-8 shadow-2xl card-3d">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-display text-3xl font-bold">BU</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">دخول الإدارة</h1>
            <p className="text-muted-foreground mt-2">يرجى إدخال كلمة المرور للمتابعة</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-12 bg-secondary/30 border-none rounded-xl text-center text-lg"
                autoFocus
              />
            </div>
            <Button type="submit" className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg transition-all">
              تسجيل الدخول
            </Button>
          </form>

          <div className="mt-8 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              العودة للموقع الرئيسي
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary" dir="rtl">
      {/* Sidebar */}
      <aside className="fixed top-0 right-0 h-full w-64 bg-card border-l border-border p-6 hidden lg:block">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-display font-bold">BU</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-foreground">لوحة التحكم</h1>
            <p className="text-xs text-muted-foreground">Beauty Universe</p>
          </div>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab("products")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === "products"
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-secondary"
              }`}
          >
            <Package className="w-5 h-5" />
            <span>المنتجات</span>
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === "orders"
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-secondary"
              }`}
          >
            <ShoppingCart className="w-5 h-5" />
            <span>الطلبات</span>
          </button>
          <a
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:bg-secondary transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>عرض الموقع</span>
            <ChevronRight className="w-4 h-4 mr-auto rotate-180" />
          </a>
        </nav>

        <div className="absolute bottom-6 right-6 left-6">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleExit}
          >
            <LogOut className="w-4 h-4 ml-2" />
            تسجيل الخروج
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:mr-64 p-6">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-display font-bold">BU</span>
            </div>
            <h1 className="font-display font-bold text-foreground">لوحة التحكم</h1>
          </div>
          <Button variant="outline" size="icon" onClick={handleExit}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>

        {activeTab === "products" ? (
          <>
            {/* Products Header */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">إدارة المنتجات</h2>
                <p className="text-muted-foreground">{products.length} منتج</p>
              </div>
              <div className="flex gap-2">
                {deleteAllConfirm ? (
                  <div className="flex items-center gap-2 bg-destructive/10 p-1 rounded-lg border border-destructive/20">
                    <span className="text-xs text-destructive font-medium px-2">هل أنت متأكد؟</span>
                    <Button variant="destructive" size="sm" onClick={handleDeleteAll}>
                      تأكيد الحذف
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setDeleteAllConfirm(false)}>
                      إلغاء
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => setDeleteAllConfirm(true)}
                  >
                    <Trash2 className="w-4 h-4 ml-2" />
                    حذف الكل
                  </Button>
                )}
                <Button variant="gold" onClick={() => openEditDialog()}>
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة منتج
                </Button>
              </div>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="ابحث عن منتج..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-md bg-card border border-border rounded-xl px-4 py-3 pr-12 text-right placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>

            {/* Products Table */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden card-3d">
              {loadingProducts ? (
                <div className="p-12 text-center">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground">جاري التحميل...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="p-12 text-center">
                  <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">لا توجد منتجات</p>
                  <Button variant="gold" className="mt-4" onClick={() => openEditDialog()}>
                    <Plus className="w-4 h-4 ml-2" />
                    أضف أول منتج
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-secondary/50">
                        <th className="text-right px-4 py-3 font-medium text-foreground">المنتج</th>
                        <th className="text-right px-4 py-3 font-medium text-foreground hidden md:table-cell">الفئة</th>
                        <th className="text-right px-4 py-3 font-medium text-foreground">السعر</th>
                        <th className="text-right px-4 py-3 font-medium text-foreground hidden sm:table-cell">المخزون</th>
                        <th className="text-right px-4 py-3 font-medium text-foreground hidden sm:table-cell">الحالة</th>
                        <th className="text-center px-4 py-3 font-medium text-foreground">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
                                {product.image_url ? (
                                  <img
                                    src={product.image_url}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <ImagePlus className="w-5 h-5 text-muted-foreground" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{product.name_ar}</p>
                                <p className="text-sm text-muted-foreground">{product.name}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell">
                            <span className="text-muted-foreground">{product.category_ar}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-medium text-primary">{product.price.toLocaleString()} دج</span>
                            {product.original_price && (
                              <span className="text-sm text-muted-foreground line-through block">
                                {product.original_price.toLocaleString()} دج
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 hidden sm:table-cell">
                            <span className={product.stock && product.stock > 0 ? "text-green-600" : "text-destructive"}>
                              {product.stock || 0}
                            </span>
                          </td>
                          <td className="px-4 py-3 hidden sm:table-cell">
                            <span
                              className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${product.is_active
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                                }`}
                            >
                              {product.is_active ? "نشط" : "غير نشط"}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEditDialog(product)}
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              {deleteConfirmId === product.id ? (
                                <div className="flex items-center gap-1">
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(product.id)}
                                  >
                                    تأكيد
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setDeleteConfirmId(null)}
                                  >
                                    إلغاء
                                  </Button>
                                </div>
                              ) : (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-destructive hover:text-destructive"
                                  onClick={() => setDeleteConfirmId(product.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Orders Header */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">إدارة الطلبات</h2>
                <p className="text-muted-foreground">{orders.length} طلب</p>
              </div>
              <Button variant="outline" onClick={fetchOrders}>
                تحديث
              </Button>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {loadingOrders ? (
                <div className="p-12 text-center bg-card rounded-2xl border border-border card-3d">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground">جاري تحميل الطلبات...</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="p-12 text-center bg-card rounded-2xl border border-border card-3d">
                  <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">لا توجد طلبات حتى الآن</p>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="bg-card rounded-2xl border border-border p-6 shadow-sm card-3d">
                    <div className="flex flex-col lg:flex-row gap-6 justify-between">
                      {/* Order Info */}
                      <div className="space-y-4 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-display text-lg font-bold text-foreground">
                            {order.customer_name}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {getStatusLabel(order.status)}
                          </span>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Truck className="w-4 h-4" />
                            <span>{order.delivery_type === 'home' ? 'توصيل للمنزل' : 'مكتب التوصيل'} - {order.wilaya}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{new Date(order.created_at).toLocaleDateString('ar-DZ')}</span>
                          </div>
                          <div className="col-span-2 text-foreground">
                            <p><strong>الهاتف:</strong> {order.phone}</p>
                            {order.address && <p><strong>العنوان:</strong> {order.address}</p>}
                            {order.notes && <p className="mt-1 text-yellow-600 bg-yellow-50 p-2 rounded"><strong>ملاحظة:</strong> {order.notes}</p>}
                          </div>
                        </div>
                      </div>

                      {/* Items & Actions */}
                      <div className="flex flex-col gap-4 min-w-[300px]">
                        <div className="bg-secondary/50 rounded-xl p-4 space-y-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span>{item.quantity}x {item.name_ar}</span>
                              <span className="font-medium">{item.price.toLocaleString()} دج</span>
                            </div>
                          ))}
                          <div className="border-t border-border pt-3 flex justify-between font-bold text-primary">
                            <span>الإجمالي</span>
                            <span>{order.total_amount.toLocaleString()} دج</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Select
                            defaultValue={order.status}
                            onValueChange={(val) => updateOrderStatus(order.id, val)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="تغيير الحالة" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">قيد الانتظار</SelectItem>
                              <SelectItem value="confirmed">تم التأكيد</SelectItem>
                              <SelectItem value="shipped">تم الشحن</SelectItem>
                              <SelectItem value="delivered">تم التوصيل</SelectItem>
                              <SelectItem value="cancelled">ملغي</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </main>

      {/* Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {editingProduct.id ? "تعديل المنتج" : "إضافة منتج جديد"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                اسم المنتج (عربي) *
              </label>
              <input
                type="text"
                value={editingProduct.name_ar}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, name_ar: e.target.value })
                }
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-right"
                placeholder="كرسي حلاقة احترافي"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                اسم المنتج (إنجليزي) *
              </label>
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, name: e.target.value })
                }
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-right"
                placeholder="Professional Barber Chair"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                السعر (دج) *
              </label>
              <input
                type="number"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, price: Number(e.target.value) })
                }
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-right"
                placeholder="50000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                السعر الأصلي (للخصم)
              </label>
              <input
                type="number"
                value={editingProduct.original_price || ""}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    original_price: e.target.value ? Number(e.target.value) : null,
                  })
                }
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-right"
                placeholder="60000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                الفئة *
              </label>
              <select
                value={editingProduct.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-right"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                المخزون
              </label>
              <input
                type="number"
                value={editingProduct.stock || 0}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })
                }
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-right"
                placeholder="10"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                الصورة الرئيسية
              </label>
              <div className="flex gap-4 items-start">
                <div className="w-32 h-32 rounded-xl border-2 border-dashed border-border bg-secondary flex items-center justify-center overflow-hidden flex-shrink-0">
                  {mainImagePreview ? (
                    <img
                      src={mainImagePreview}
                      alt="Main preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImagePlus className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>

                <div className="flex-1 space-y-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageUpload}
                    className="hidden"
                    id="product-main-image-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                        جاري الرفع...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 ml-2" />
                        رفع الصورة الرئيسية
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground">JPG, PNG - 5MB</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                صور المعرض
              </label>
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-3">
                  {galleryPreviews.length > 0 ? (
                    galleryPreviews.map((src, idx) => (
                      <div
                        key={`${src}-${idx}`}
                        className="w-20 h-20 rounded-lg border border-border bg-secondary overflow-hidden"
                      >
                        <img src={src} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))
                  ) : (
                    <div className="w-20 h-20 rounded-lg border border-dashed border-border bg-secondary flex items-center justify-center">
                      <ImagePlus className="w-5 h-5 text-muted-foreground" />
                    </div>
                  )}
                </div>

                <input
                  ref={galleryInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryImagesUpload}
                  className="hidden"
                  id="product-gallery-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => galleryInputRef.current?.click()}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                      جاري الرفع...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 ml-2" />
                      رفع صور المعرض
                    </>
                  )}
                </Button>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                الوصف (عربي)
              </label>
              <textarea
                value={editingProduct.description_ar}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, description_ar: e.target.value })
                }
                rows={3}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-right resize-none"
                placeholder="وصف المنتج..."
              />
            </div>

            <div className="md:col-span-2 flex flex-wrap gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingProduct.is_new || false}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, is_new: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                />
                <span>منتج جديد</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingProduct.is_sale || false}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, is_sale: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                />
                <span>عرض خاص</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingProduct.is_active ?? true}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, is_active: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                />
                <span>نشط</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button variant="gold" className="flex-1" onClick={handleSave} disabled={isSaving}>
              <Save className="w-4 h-4 ml-2" />
              {isSaving ? "جاري الحفظ..." : "حفظ"}
            </Button>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              <X className="w-4 h-4 ml-2" />
              إلغاء
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;

