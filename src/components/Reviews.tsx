import { Star } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { AnimatedSection } from "@/hooks/useScrollAnimation";

const reviews = [
  {
    id: 1,
    name: "Wissem Allache",
    date: "February 2025",
    text: "À l'écoute, réactifs, sérieux et professionnels. Merci beaucoup 🙏 Allah ybarak thalaw fiya ou sa3doni ou tal9a kolach même Ila ma3andhomch ydjibolak wallah lah ybarak Rabi ywafa9kom inchallah",
  },
  {
    id: 2,
    name: "Amir Amine",
    date: "January 2025",
    text: "meilleur service... vraiment c'est top... je recommande 🌹🌹🌹🌹🌹",
  },
  {
    id: 3,
    name: "Dounya Rahmane",
    date: "February 2025",
    text: "انا من قورصوا شكرا على التوصيل عتاد التجميل وحسن المعاملة",
  },
  {
    id: 4,
    name: "Abdou Lizli",
    date: "January 2025",
    text: "انا من تسمسيلت ❤️ شكرا على التوصيل سلعة ماشاء الله كراسي للحلاقة روعة وخدمة الزبون في القمة ان شاء الله مزال نزيد نشري عليكم ❤️",
  },
];

const Reviews = () => {
  const { t, dir } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-secondary/50" dir={dir}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <AnimatedSection animation="fade-up" className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            {t('reviews.title')}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground">{t('reviews.subtitle')}</p>
        </AnimatedSection>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <AnimatedSection
              key={review.id}
              animation="fade-up"
              delay={index * 100}
              className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 card-3d"
            >
              {/* Stars */}
              <div className={`flex gap-1 mb-4 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Text */}
              <p className={`text-foreground leading-relaxed mb-6 line-clamp-4 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                "{review.text}"
              </p>

              {/* Author */}
              <div className={`border-t border-border pt-4 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                <h4 className="font-semibold text-foreground">{review.name}</h4>
                <p className="text-sm text-primary">{t('reviews.verified')}</p>
                <p className="text-sm text-muted-foreground mt-1">{review.date}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
