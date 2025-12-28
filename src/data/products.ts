export interface Product {
  id: string;
  name: string;
  name_ar: string;
  price: number;
  original_price?: number | null;
  image_url: string | null;
  category: string;
  category_ar: string;
  rating: number | null;
  is_new?: boolean | null;
  is_sale?: boolean | null;
  is_active?: boolean | null;
  description?: string | null;
  description_ar?: string | null;
  stock?: number | null;
}

export const categories = [
  { id: "all", label: "الكل", labelFr: "Tout" },
  { id: "chairs", label: "كراسي", labelFr: "Chaises" },
  { id: "mirrors", label: "مرايا", labelFr: "Miroirs" },
  { id: "furniture", label: "أثاث", labelFr: "Mobilier" },
  { id: "cosmetics", label: "مستحضرات التجميل", labelFr: "Cosmétiques" },
  { id: "tools", label: "أدوات", labelFr: "Outils" },
  { id: "accessories", label: "إكسسوارات", labelFr: "Accessoires" },
];
