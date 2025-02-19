"use client";

import React, { ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";

interface HorizontalAnimationProps {
  xDistance?: number; // Distance to move horizontally
  yDistance?: number; // Distance to move vertically
  duration?: number; // Duration of the animation
  easing?: string; // Easing function
  children: ReactNode; // Animated content
  className?: string; // Custom CSS class
  yoyo?: boolean; // Yoyo effect (reverse animation)
  motionType?: "bounce" | "float" | "elastic" | "smooth"; // Type of motion
}

const HorizontalAnimation: React.FC<HorizontalAnimationProps> = ({
  xDistance = 50, // Default horizontal distance
  yDistance = 0, // Default vertical distance (no vertical motion)
  duration = 1, // Default animation duration
  easing = "power1.inOut", // Default easing function
  className = "",
  children,
  yoyo = true, // Default yoyo effect
  motionType = "smooth", // Default motion type
}) => {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boxRef.current) {
      // Determine easing based on motion type
      const computedEasing = (() => {
        switch (motionType) {
          case "bounce":
            return "bounce.out";
          case "float":
            return "sine.inOut";
          case "elastic":
            return "elastic.out(1, 0.3)";
          case "smooth":
          default:
            return easing;
        }
      })();

      // GSAP Animation for left-right (x) and up-down (y)
      gsap.to(boxRef.current, {
        x: xDistance,
        y: -yDistance,
        duration,
        repeat: -1, // Infinite animation
        yoyo, // Reverse animation
        ease: computedEasing, // Apply computed easing
      });
    }
  }, [xDistance, yDistance, duration, easing, motionType, yoyo]);

  return (
    <div ref={boxRef} className={className}>
      {children}
    </div>
  );
};

export default HorizontalAnimation;
