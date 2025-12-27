import barberChair from "@/assets/barber-chair.jpg";
import ledMirror from "@/assets/led-mirror.jpg";
import cosmetics from "@/assets/cosmetics.jpg";

const categories = [
  {
    id: 1,
    name: "حلاقة",
    image: barberChair,
  },
  {
    id: 2,
    name: "تجميل",
    image: ledMirror,
  },
  {
    id: 3,
    name: "مستحضرات تجميل",
    image: cosmetics,
  },
];

const Categories = () => {
  return (
    <section id="categories" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-medium">فئاتنا</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
            اكتشفي عالم الجمال
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-background">
                  {category.name}
                </h3>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
