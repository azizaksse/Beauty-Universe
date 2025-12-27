import { Truck, RefreshCw, CreditCard } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const TrustBadges = () => {
  const { t, dir } = useLanguage();

  const badges = [
    {
      icon: Truck,
      title: t('trust.delivery.title'),
      description: t('trust.delivery.description'),
    },
    {
      icon: RefreshCw,
      title: t('trust.exchange.title'),
      description: t('trust.exchange.description'),
    },
    {
      icon: CreditCard,
      title: t('trust.payment.title'),
      description: t('trust.payment.description'),
    },
  ];

  return (
    <section className="py-16 bg-secondary/50 border-y border-border" dir={dir}>
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
