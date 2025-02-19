import React, { ReactNode, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface BounceAnimationProps {
  children: ReactNode;
  distance?: number; // Distance for bounce movement
  duration?: number; // Duration of bounce animation
  bounceDuration?: number; // Duration of each bounce
  interval?: number; // Interval for changing direction (in ms)
  className?: string;
}

type Direction = "up" | "down" | "left" | "right"; // Restrict directions to only these values

const BounceAnimation: React.FC<BounceAnimationProps> = ({
  children,
  distance = 50,
  bounceDuration = 0.5,
  interval = 2000, // Default change every 2 seconds
  className = "",
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<Direction>("up"); // Default direction is "up"

  useEffect(() => {
    // Define the directions for bounce
    const directions: Direction[] = ["up", "down", "left", "right"];

    const changeDirection = () => {
      // Randomly pick a new direction every interval
      const randomDirection =
        directions[Math.floor(Math.random() * directions.length)];
      setDirection(randomDirection);
    };

    // Change direction at regular intervals
    const intervalId = setInterval(changeDirection, interval);

    return () => clearInterval(intervalId); // Cleanup the interval on unmount
  }, [interval]);

  useEffect(() => {
    if (elementRef.current) {
      const element = elementRef.current;

      // Define the animation properties for each direction
      let animationProps: { x?: number; y?: number } = {};

      switch (direction) {
        case "up":
          animationProps = { y: -distance };
          break;
        case "down":
          animationProps = { y: distance };
          break;
        case "left":
          animationProps = { x: -distance };
          break;
        case "right":
          animationProps = { x: distance };
          break;
        default:
          animationProps = { y: -distance }; // Default case to avoid TypeScript errors
      }

      // Apply GSAP bounce animation with direction change
      gsap.to(element, {
        ...animationProps,
        duration: bounceDuration,
        repeat: -1, // Infinite bounce
        yoyo: true, // Reverse direction after each cycle
        ease: "smooth", // Bounce easing
      });
    }
  }, [direction, distance, bounceDuration]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default BounceAnimation;
