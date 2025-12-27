import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import heroVideo from "@/assets/high-quality_file_hero_bckground.mp4";

const Hero = () => {
  const { t, dir, language } = useLanguage();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden" dir={dir}>
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-l from-foreground/80 via-foreground/60 to-foreground/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-2xl ${dir === 'rtl' ? 'mr-auto text-right' : 'ml-auto text-left'}`}>
          {/* Badge */}
          <div className="animate-fade-in mb-8">
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/30 to-primary/10 backdrop-blur-md border border-primary/30 text-primary px-5 py-2 rounded-full text-sm font-semibold shadow-lg shadow-primary/20">
              <Sparkles className="w-4 h-4" />
              {t('hero.badge')}
            </span>
          </div>

          {/* Title with decorative elements */}
          <div className="relative mb-8">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-background leading-tight animate-slide-up">
              <span className="block mb-2">Beauty Universe</span>
              <span className="block text-primary drop-shadow-[0_2px_10px_rgba(212,175,55,0.5)]">
                {language === 'ar' ? 'عالم الجمال في الجزائر' : "L'univers de la beauté en Algérie"}
              </span>
            </h1>
            {/* Decorative line */}
            <div className={`absolute -bottom-4 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-24 h-1 bg-gradient-to-r from-primary to-primary/30 rounded-full`} />
          </div>

          {/* Description Card */}
          <div 
            className="bg-background/10 backdrop-blur-md border border-background/20 rounded-2xl p-6 mb-8 animate-slide-up shadow-xl"
            style={{ animationDelay: "0.1s" }}
          >
            <p className="text-background text-lg md:text-xl leading-relaxed">
              {t('hero.description')}
            </p>
          </div>

          {/* CTA Buttons */}
          <div 
            className={`flex flex-wrap gap-4 animate-slide-up ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}
            style={{ animationDelay: "0.2s" }}
          >
            <Button
              className="group btn-gold px-8 py-6 text-lg rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
            >
              {t('hero.cta')}
              <ArrowIcon className={`w-5 h-5 ${dir === 'rtl' ? 'mr-2' : 'ml-2'} group-hover:translate-x-1 transition-transform`} />
            </Button>
            <Button
              variant="outline"
              className="px-8 py-6 text-lg rounded-full border-2 border-background/50 text-background hover:bg-background/20 hover:border-background backdrop-blur-sm transition-all duration-300"
            >
              {t('nav.catalog')}
            </Button>
          </div>

          {/* Trust indicators */}
          <div 
            className={`flex flex-wrap gap-6 mt-10 animate-slide-up ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center gap-2 text-background/80">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-medium">
                {language === 'ar' ? 'توصيل سريع' : 'Livraison rapide'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-background/80">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-medium">
                {language === 'ar' ? 'الدفع عند الاستلام' : 'Paiement à la livraison'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-background/80">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-medium">
                {language === 'ar' ? 'ضمان الجودة' : 'Qualité garantie'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;