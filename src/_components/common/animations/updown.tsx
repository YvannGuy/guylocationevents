"use client";
import React, { ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";

interface UpDownAnimationProps {
  distance?: number; // Vertical movement distance
  xDistance?: number; // Horizontal movement distance
  duration?: number; // Duration of one cycle
  easing?: string; // GSAP easing type
  children: ReactNode; // Content inside the animated box
  className?: string; // Custom CSS class for styling
  yoyo?: boolean; // Reverse animation on repeat
  motionType?: "bounce" | "float" | "elastic" | "smooth"; // Animation style
}

const UpDownAnimation: React.FC<UpDownAnimationProps> = ({
  distance = 50,
  xDistance = 50,
  duration = 2,
  easing = "power1.inOut",
  className = "",
  children,
  yoyo = true,
  motionType = "smooth",
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

      // GSAP animation with top, bottom, left, right movement
      gsap.to(boxRef.current, {
        keyframes: [
          { x: 0, y: -distance }, // Move up
          { x: xDistance, y: 0 }, // Move right
          { x: 0, y: distance }, // Move down
          { x: -xDistance, y: 0 }, // Move left
        ],
        duration,
        repeat: -1, // Infinite loop
        yoyo,
        ease: computedEasing,
      });
    }
  }, [distance, xDistance, duration, easing, motionType, yoyo]);

  return (
    <div ref={boxRef} className={className}>
      {children}
    </div>
  );
};

export default UpDownAnimation;
