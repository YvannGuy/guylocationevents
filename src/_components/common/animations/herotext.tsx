import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface BouncyTextAnimationProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

const BouncyTextAnimation: React.FC<BouncyTextAnimationProps> = ({
  text,
  className = "",
  speed = 1.5,
  delay = 0,
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const words = text.split(" "); // Split text into words
      textRef.current.innerHTML = ""; // Clear previous content

      words.forEach((word, index) => {
        // Create an individual span for each word
        const span = document.createElement("span");
        span.textContent = word;
        span.style.display = "inline-block"; // Make the word behave as an inline block
        span.style.marginRight = "8px"; // Add spacing between words
        if(textRef.current){
            textRef.current.appendChild(span);
        }

        // Animate each word sequentially
        gsap.fromTo(
          span,
          {
            y: -100,
            opacity: 0,
          },
          {
            opacity: 1,
            y: 0,
            duration: speed,
            ease: "power3.out", // Smooth easing for falling animation
            delay: index * 0.3 + delay, // Sequential delay for each word
          }
        );
      });
    }
  }, [text, speed, delay]);

  return <div ref={textRef} className={className}></div>;
};

export default BouncyTextAnimation;
