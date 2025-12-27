import { useState, useMemo } from "react";
import { Grid3X3, List, SlidersHorizontal, ChevronDown, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { products, categories } from "@/data/products";

type SortOption = "default" | "price-asc" | "price-desc" | "rating" | "newest";
type ViewMode = "grid" | "list";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.nameAr.includes(query) ||
          p.categoryAr.includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return result;
  }, [selectedCategory, sortBy, searchQuery]);

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-b from-secondary to-background py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              كتالوج المنتجات
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              اكتشف مجموعتنا الواسعة من معدات الصالون ومستحضرات التجميل الاحترافية
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Search & Controls Bar */}
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="ابحث عن منتج..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card border border-border rounded-xl px-4 py-3 pr-12 text-right placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              {/* Mobile Filters Toggle */}
              <Button
                variant="outline"
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-4 h-4 ml-2" />
                الفلاتر
                <ChevronDown
                  className={`w-4 h-4 mr-2 transition-transform ${showFilters ? "rotate-180" : ""}`}
                />
              </Button>

              {/* Sort */}
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                <SelectTrigger className="w-[180px] bg-card">
                  <SelectValue placeholder="ترتيب حسب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">الترتيب الافتراضي</SelectItem>
                  <SelectItem value="price-asc">السعر: من الأقل للأعلى</SelectItem>
                  <SelectItem value="price-desc">السعر: من الأعلى للأقل</SelectItem>
                  <SelectItem value="rating">التقييم</SelectItem>
                  <SelectItem value="newest">الأحدث</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="flex bg-card border border-border rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              {/* Results Count */}
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {filteredAndSortedProducts.length} منتج
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside
              className={`lg:w-64 flex-shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}
            >
              <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                  الفئات
                </h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-right px-4 py-2.5 rounded-xl transition-all ${
                        selectedCategory === cat.id
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Price Range - Visual Only */}
                <div className="mt-8 pt-6 border-t border-border">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                    نطاق السعر
                  </h3>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      placeholder="من"
                      className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-right"
                    />
                    <input
                      type="number"
                      placeholder="إلى"
                      className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-right"
                    />
                  </div>
                </div>

                {/* Quick Filters */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                    فلاتر سريعة
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-foreground">منتجات جديدة</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-foreground">عروض خاصة</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-foreground">الأعلى تقييماً</span>
                    </label>
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {filteredAndSortedProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">
                    لا توجد منتجات مطابقة لبحثك
                  </p>
                  <Button
                    variant="gold-outline"
                    className="mt-4"
                    onClick={() => {
                      setSelectedCategory("all");
                      setSearchQuery("");
                    }}
                  >
                    إعادة تعيين الفلاتر
                  </Button>
                </div>
              ) : (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                      : "flex flex-col gap-4"
                  }
                >
                  {filteredAndSortedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      nameAr={product.nameAr}
                      price={product.price}
                      originalPrice={product.originalPrice}
                      image={product.image}
                      category={product.categoryAr}
                      rating={product.rating}
                      isNew={product.isNew}
                      isSale={product.isSale}
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Products;
