import { Button } from "@/components/ui/button";
import heroVideo from "@/assets/high-quality_file_hero_bckground.mp4";

const Hero = () => {
  return (
    <section className="relative min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden">
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
        <div className="max-w-2xl mr-auto text-right">
          <span className="inline-block bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6 animate-fade-in">
            تشكيلة جديدة 2025
          </span>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-6 leading-tight animate-slide-up">
            Beauty Universe - عالم الجمال في الجزائر
          </h1>

          <p className="text-background/90 text-lg md:text-xl mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            بيع وتوزيع معدات ومنتجات ومواد الحلاقة والتجميل ومستحضرات التجميل.
            توصيل لـ 58 ولاية.
          </p>

          <Button
            className="btn-gold px-8 py-6 text-lg rounded-full animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            اكتشفي الآن
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
