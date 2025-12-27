import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  ImagePlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  rating: number | null;
  is_new: boolean | null;
  is_sale: boolean | null;
  is_active: boolean | null;
  stock: number | null;
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
  rating: 5,
  is_new: false,
  is_sale: false,
  is_active: true,
  stock: 0,
};

const Admin = () => {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<typeof emptyProduct & { id?: string }>(emptyProduct);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate("/auth");
      } else if (!isAdmin) {
        toast({
          title: "غير مصرح",
          description: "ليس لديك صلاحية الوصول لهذه الصفحة",
          variant: "destructive",
        });
        navigate("/");
      }
    }
  }, [user, isAdmin, isLoading, navigate, toast]);

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
    }
  }, [isAdmin]);

  const fetchProducts = async () => {
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
      setProducts(data || []);
    }
    setLoadingProducts(false);
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
      image_url: editingProduct.image_url || null,
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
      toast({
        title: "خطأ",
        description: "فشل في حذف المنتج",
        variant: "destructive",
      });
    } else {
      toast({ title: "تم الحذف بنجاح" });
      fetchProducts();
    }
    setDeleteConfirmId(null);
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

  const handleCategoryChange = (categoryId: string) => {
    const cat = categories.find((c) => c.id === categoryId);
    setEditingProduct({
      ...editingProduct,
      category: categoryId,
      category_ar: cat?.label || "",
    });
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.name_ar.includes(searchQuery)
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
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
          <a
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-primary-foreground"
          >
            <Package className="w-5 h-5" />
            <span>المنتجات</span>
          </a>
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
            onClick={() => signOut().then(() => navigate("/"))}
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
          <Button variant="outline" size="icon" onClick={() => signOut().then(() => navigate("/"))}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">إدارة المنتجات</h2>
            <p className="text-muted-foreground">{products.length} منتج</p>
          </div>
          <Button variant="gold" onClick={() => openEditDialog()}>
            <Plus className="w-4 h-4 ml-2" />
            إضافة منتج
          </Button>
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
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
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
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            product.is_active
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
                رابط الصورة
              </label>
              <input
                type="url"
                value={editingProduct.image_url}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, image_url: e.target.value })
                }
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-right"
                placeholder="https://example.com/image.jpg"
              />
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
