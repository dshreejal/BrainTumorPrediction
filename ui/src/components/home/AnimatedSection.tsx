import { FC } from "react";

import { useSpring, animated, config } from "react-spring";
import { useInView } from "react-intersection-observer";
interface AnimatedSectionProps {
  children: React.ReactNode;
  id: string;
}

const AnimatedSection: FC<AnimatedSectionProps> = ({ children, id }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const props = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(30px)",
    config: { ...config.molasses, duration: 1000 },
  });

  return (
    <animated.section
      ref={ref}
      style={props}
      id={id}
      className="w-full py-12 md:py-24"
    >
      {children}
    </animated.section>
  );
};

export default AnimatedSection;
