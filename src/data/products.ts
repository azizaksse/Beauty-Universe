import barberChair from "@/assets/barber-chair.jpg";
import ledMirror from "@/assets/led-mirror.jpg";
import cosmetics from "@/assets/cosmetics.jpg";

export interface Product {
  id: number;
  name: string;
  nameAr: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  categoryAr: string;
  rating: number;
  isNew?: boolean;
  isSale?: boolean;
}

export const categories = [
  { id: "all", label: "الكل", labelEn: "All" },
  { id: "chairs", label: "كراسي الحلاقة", labelEn: "Barber Chairs" },
  { id: "mirrors", label: "المرايا", labelEn: "Mirrors" },
  { id: "cosmetics", label: "مستحضرات التجميل", labelEn: "Cosmetics" },
  { id: "tools", label: "أدوات الحلاقة", labelEn: "Barber Tools" },
  { id: "furniture", label: "الأثاث", labelEn: "Furniture" },
  { id: "accessories", label: "الإكسسوارات", labelEn: "Accessories" },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Professional Barber Chair",
    nameAr: "كرسي حلاقة احترافي",
    price: 85000,
    originalPrice: 95000,
    image: barberChair,
    category: "chairs",
    categoryAr: "كراسي الحلاقة",
    rating: 5,
    isSale: true,
  },
  {
    id: 2,
    name: "LED Makeup Mirror",
    nameAr: "مرآة مكياج LED",
    price: 12000,
    image: ledMirror,
    category: "mirrors",
    categoryAr: "المرايا",
    rating: 4,
    isNew: true,
  },
  {
    id: 3,
    name: "Premium Cosmetics Set",
    nameAr: "طقم مستحضرات تجميل فاخر",
    price: 25000,
    originalPrice: 32000,
    image: cosmetics,
    category: "cosmetics",
    categoryAr: "مستحضرات التجميل",
    rating: 5,
    isSale: true,
  },
  {
    id: 4,
    name: "Hydraulic Styling Chair",
    nameAr: "كرسي تصفيف هيدروليكي",
    price: 72000,
    image: barberChair,
    category: "chairs",
    categoryAr: "كراسي الحلاقة",
    rating: 4,
  },
  {
    id: 5,
    name: "Hollywood Vanity Mirror",
    nameAr: "مرآة هوليوود للزينة",
    price: 18500,
    image: ledMirror,
    category: "mirrors",
    categoryAr: "المرايا",
    rating: 5,
    isNew: true,
  },
  {
    id: 6,
    name: "Professional Hair Dryer",
    nameAr: "مجفف شعر احترافي",
    price: 8500,
    originalPrice: 11000,
    image: cosmetics,
    category: "tools",
    categoryAr: "أدوات الحلاقة",
    rating: 4,
    isSale: true,
  },
  {
    id: 7,
    name: "Barber Station Cabinet",
    nameAr: "خزانة محطة الحلاقة",
    price: 45000,
    image: barberChair,
    category: "furniture",
    categoryAr: "الأثاث",
    rating: 5,
  },
  {
    id: 8,
    name: "Hair Clipper Set",
    nameAr: "طقم ماكينة حلاقة",
    price: 15000,
    image: cosmetics,
    category: "tools",
    categoryAr: "أدوات الحلاقة",
    rating: 4,
    isNew: true,
  },
  {
    id: 9,
    name: "Salon Wash Basin",
    nameAr: "حوض غسيل الصالون",
    price: 38000,
    originalPrice: 45000,
    image: ledMirror,
    category: "furniture",
    categoryAr: "الأثاث",
    rating: 5,
    isSale: true,
  },
  {
    id: 10,
    name: "Makeup Brush Set",
    nameAr: "طقم فرش المكياج",
    price: 6500,
    image: cosmetics,
    category: "accessories",
    categoryAr: "الإكسسوارات",
    rating: 4,
  },
  {
    id: 11,
    name: "Rotating Barber Pole",
    nameAr: "عمود الحلاقة الدوار",
    price: 22000,
    image: barberChair,
    category: "accessories",
    categoryAr: "الإكسسوارات",
    rating: 5,
    isNew: true,
  },
  {
    id: 12,
    name: "Facial Steamer",
    nameAr: "جهاز بخار الوجه",
    price: 9800,
    originalPrice: 12500,
    image: ledMirror,
    category: "tools",
    categoryAr: "أدوات الحلاقة",
    rating: 4,
    isSale: true,
  },
];
