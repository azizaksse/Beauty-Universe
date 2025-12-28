import { useEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};

// Animation wrapper component
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "zoom-out";
  delay?: number;
  duration?: number;
}

export const AnimatedSection = ({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  duration = 600,
}: AnimatedSectionProps) => {
  const { ref, isVisible } = useScrollAnimation();

  const getAnimationStyles = () => {
    const baseStyles = {
      transition: `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
    };

    if (!isVisible) {
      switch (animation) {
        case "fade-up":
          return { ...baseStyles, opacity: 0, transform: "translateY(40px)" };
        case "fade-down":
          return { ...baseStyles, opacity: 0, transform: "translateY(-40px)" };
        case "fade-left":
          return { ...baseStyles, opacity: 0, transform: "translateX(40px)" };
        case "fade-right":
          return { ...baseStyles, opacity: 0, transform: "translateX(-40px)" };
        case "zoom-in":
          return { ...baseStyles, opacity: 0, transform: "scale(0.9)" };
        case "zoom-out":
          return { ...baseStyles, opacity: 0, transform: "scale(1.1)" };
        default:
          return { ...baseStyles, opacity: 0 };
      }
    }

    return { ...baseStyles, opacity: 1, transform: "translateY(0) translateX(0) scale(1)" };
  };

  return (
    <div ref={ref} className={className} style={getAnimationStyles()}>
      {children}
    </div>
  );
};

// Stagger children animation component
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggerContainer = ({
  children,
  className = "",
  staggerDelay = 100,
}: StaggerContainerProps) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div
              key={index}
              style={{
                transition: `all 600ms cubic-bezier(0.4, 0, 0.2, 1) ${index * staggerDelay}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
              }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  );
};
