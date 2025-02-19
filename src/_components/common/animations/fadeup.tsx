import React, { ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FadeInAnimationProps {
  children: ReactNode;
  duration?: number; // Duration of the fade-in effect
  delay?: number; // Delay before the animation starts
  triggerPosition?: string; // Position when the scroll trigger should start (e.g., "top 80%")
  triggerEndPosition?: string; // End position for the scroll trigger (e.g., "top 20%")
  offsetY?: number; // Y-axis offset for the animation (default is 100px)
  triggerElement?: string; // CSS selector for the custom trigger (defaults to the component itself)
  className?: string; // Optional class name
  triggerOnce?: boolean; // Whether to trigger the animation once and never again
}

const FadeInAnimation: React.FC<FadeInAnimationProps> = ({
  children,
  duration = 1,
  delay = 0,
  triggerPosition = "top 80%",
  triggerEndPosition = "top 20%",
  offsetY = 100,
  triggerElement,
  className = "",
  triggerOnce = false, // Default to false, meaning it triggers every time it scrolls into view
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: offsetY,
        },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: triggerElement || element,
            start: triggerPosition,
            end: triggerEndPosition,
            toggleActions: "play none none reset",
            once: triggerOnce, // Trigger animation only once if `triggerOnce` is true
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [
    duration,
    delay,
    triggerPosition,
    triggerEndPosition,
    offsetY,
    triggerElement,
    triggerOnce
  ]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default FadeInAnimation;
