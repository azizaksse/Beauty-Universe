import { Truck, RefreshCw, CreditCard } from "lucide-react";

const badges = [
  {
    icon: Truck,
    title: "توصيل 58 ولاية",
    description: "شحن سريع والدفع عند الاستلام.",
  },
  {
    icon: RefreshCw,
    title: "استبدال خلال 7 أيام",
    description: "إمكانية الاستبدال خلال 7 أيام مع رسوم الإرجاع.",
  },
  {
    icon: CreditCard,
    title: "الدفع عند الاستلام",
    description: "لا يوجد دفع عبر الإنترنت، كل شيء يتم عند التسليم.",
  },
];

const TrustBadges = () => {
  return (
    <section className="py-16 bg-secondary/50 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-4 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <badge.icon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-1">
                  {badge.title}
                </h3>
                <p className="text-muted-foreground text-sm">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
