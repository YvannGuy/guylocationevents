"use client";
import React, { FC, ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";

interface MovingCircleProps {
  xDistance?: number; // Horizontal movement distance
  yDistance?: number; // Vertical movement distance
  duration?: number; // Animation duration
  easing?: string; // GSAP easing function
  children: ReactNode; // Content inside the circle
  className?: string; // Custom CSS class for styling
  yoyo?: boolean; // Whether the animation yoyo (reverse) on repeat
  motionType?: "bounce" | "float" | "elastic" | "smooth"; // Motion behavior
  rotation?: number; // Rotation angle in degrees
  scale?: number; // Scale multiplier
  repeat?: number; // Number of repeats
}

const MovingCircle: FC<MovingCircleProps> = ({
  xDistance = 0,
  yDistance = 0,
  className,
  yoyo = false,
  children,
  duration = 2,
  easing = "power1.inOut",
  motionType = "smooth",
  rotation = 360,
  scale = 1.5,
  repeat = -1, // Infinite repeat by default
}) => {
  const circleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Determine easing and motion behavior
    const motionEase =
      motionType === "bounce"
        ? "bounce.out"
        : motionType === "elastic"
        ? "elastic.out(1, 0.3)"
        : motionType === "float"
        ? "power2.inOut"
        : easing; // Default to custom easing

    // GSAP animation
    gsap.to(circleRef.current, {
      x: xDistance,
      y: yDistance,
      scale,
      rotation,
      repeat,
      yoyo,
      duration,
      ease: motionEase,
    });
  }, [
    xDistance,
    yDistance,
    duration,
    easing,
    motionType,
    rotation,
    scale,
    repeat,
    yoyo,
  ]);

  return (
    <div className={className} ref={circleRef}>
      {children}
    </div>
  );
};

export default MovingCircle;
