import { useState, useEffect, useMemo } from "react";
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
import { categories, Product } from "@/data/products";
import { useLanguage } from "@/hooks/useLanguage";
import { supabase } from "@/integrations/supabase/client";
import { ProductCardSkeleton } from "@/components/Skeleton";
import { resolveProductMainImageUrl } from "@/integrations/supabase/storage";

type SortOption = "default" | "price-asc" | "price-desc" | "rating" | "newest";
type ViewMode = "grid" | "list";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const { language, t, dir } = useLanguage();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (!error && data) {
      const resolved = await Promise.all(
        data.map(async (product) => ({
          ...product,
          image_url: await resolveProductMainImageUrl(product.image_url, product.main_image_path),
        }))
      );
      setProducts(resolved);
    }
    setLoading(false);
  };

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
          p.name_ar.includes(query) ||
          p.category_ar.includes(query) ||
          p.category.toLowerCase().includes(query)
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
        result.sort((a, b) => (b.rating || 5) - (a.rating || 5));
        break;
      case "newest":
        result.sort((a, b) => (b.is_new ? 1 : 0) - (a.is_new ? 1 : 0));
        break;
    }

    return result;
  }, [products, selectedCategory, sortBy, searchQuery]);

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-b from-secondary to-background py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('products.title')}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('products.subtitle')}
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
                placeholder={t('products.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full bg-card border border-border rounded-xl px-4 py-3 ${dir === 'rtl' ? 'pr-12 text-right' : 'pl-12 text-left'} placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
              />
              <Search className={`absolute ${dir === 'rtl' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground`} />
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              {/* Mobile Filters Toggle */}
              <Button
                variant="outline"
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className={`w-4 h-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                {t('products.filters')}
                <ChevronDown
                  className={`w-4 h-4 ${dir === 'rtl' ? 'mr-2' : 'ml-2'} transition-transform ${showFilters ? "rotate-180" : ""}`}
                />
              </Button>

              {/* Sort */}
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                <SelectTrigger className="w-[180px] bg-card">
                  <SelectValue placeholder={t('products.sortBy')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">{t('products.sortDefault')}</SelectItem>
                  <SelectItem value="price-asc">{t('products.sortPriceAsc')}</SelectItem>
                  <SelectItem value="price-desc">{t('products.sortPriceDesc')}</SelectItem>
                  <SelectItem value="rating">{t('products.sortRating')}</SelectItem>
                  <SelectItem value="newest">{t('products.sortNewest')}</SelectItem>
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
                {filteredAndSortedProducts.length} {t('products.product')}
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside
              className={`lg:w-64 flex-shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}
            >
              <div className="bg-card border border-border rounded-2xl p-6 sticky top-24 card-3d">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                  {t('products.categories')}
                </h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full ${dir === 'rtl' ? 'text-right' : 'text-left'} px-4 py-2.5 rounded-xl transition-all ${
                        selectedCategory === cat.id
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      {language === 'ar' ? cat.label : cat.labelFr}
                    </button>
                  ))}
                </div>

                {/* Price Range - Visual Only */}
                <div className="mt-8 pt-6 border-t border-border">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                    {t('products.priceRange')}
                  </h3>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      placeholder={t('products.from')}
                      className={`w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                    />
                    <input
                      type="number"
                      placeholder={t('products.to')}
                      className={`w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                    />
                  </div>
                </div>

                {/* Quick Filters */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                    {t('products.quickFilters')}
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-foreground">{t('products.newProducts')}</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-foreground">{t('products.specialOffers')}</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-foreground">{t('products.topRated')}</span>
                    </label>
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {loading ? (
                <div className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                }`}>
                  {[...Array(6)].map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              ) : filteredAndSortedProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">
                    {t('products.noResults')}
                  </p>
                  <Button
                    variant="gold-outline"
                    className="mt-4"
                    onClick={() => {
                      setSelectedCategory("all");
                      setSearchQuery("");
                    }}
                  >
                    {t('products.resetFilters')}
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
                      nameAr={product.name_ar}
                      price={product.price}
                      originalPrice={product.original_price}
                      image={product.image_url}
                      categoryAr={product.category_ar}
                      categoryFr={product.category}
                      rating={product.rating}
                      isNew={product.is_new}
                      isSale={product.is_sale}
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
