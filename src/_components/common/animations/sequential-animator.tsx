import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface SequentialFormAnimatorProps {
  children: React.ReactNode;
  duration?: number;
  stagger?: number;
  animationProps?: gsap.TweenVars;
}

const SequentialFormAnimator: React.FC<SequentialFormAnimatorProps> = ({
  children,
  duration = 0.5,
  stagger = 0.3,
  animationProps = {},
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const elements = Array.from(containerRef.current.children) as HTMLElement[];

      gsap.fromTo(
        elements,
        { opacity: 0, y: -300, ...animationProps },
        {
          opacity: 1,
          y: 0,
          stagger: stagger,
          duration: duration,
          ease: "power3.out",
        }
      );
    }
  }, [duration, stagger, animationProps]);

  return <div ref={containerRef}>{children}</div>;
};

export default SequentialFormAnimator;
