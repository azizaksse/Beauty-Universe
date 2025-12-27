import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import heroVideo from "@/assets/high-quality_file_hero_bckground.mp4";

const Hero = () => {
  const { t, dir } = useLanguage();

  return (
    <section className="relative min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden" dir={dir}>
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
        <div className="absolute inset-0 bg-gradient-to-l from-foreground/70 via-foreground/50 to-foreground/30" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-2xl ${dir === 'rtl' ? 'mr-auto text-right' : 'ml-auto text-left'}`}>
          <span className="inline-block bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6 animate-fade-in">
            {t('hero.badge')}
          </span>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-6 leading-tight animate-slide-up">
            {t('hero.title')}
          </h1>

          <p className="text-background/90 text-lg md:text-xl mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            {t('hero.description')}
          </p>

          <Button
            className="btn-gold px-8 py-6 text-lg rounded-full animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            {t('hero.cta')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
