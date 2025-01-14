import React from "react";
import { useSpring, animated, config } from "react-spring";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const containerAnimation = useSpring({
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
    config: config.gentle,
    delay: 200,
  });

  const numberAnimations = [4, 0, 4].map((_, index) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSpring({
      from: { opacity: 0, transform: "translateY(-20px)" },
      to: { opacity: 1, transform: "translateY(0px)" },
      delay: index * 100,
      config: { ...config.wobbly, friction: 10 },
    })
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-indigo-100 p-4">
      <animated.div style={containerAnimation} className="text-center">
        <div className="flex justify-center mb-8">
          {[4, 0, 4].map((num, index) => (
            <animated.div
              key={index}
              style={numberAnimations[index]}
              className="text-8xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mx-2"
            >
              {num}
            </animated.div>
          ))}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="bg-purple-600 text-white hover:bg-purple-700 text-lg py-2 px-6"
        >
          Go Back Home
        </Button>
      </animated.div>
    </div>
  );
};

export default NotFound;
