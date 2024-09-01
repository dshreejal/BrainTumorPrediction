/* eslint-disable @typescript-eslint/no-empty-object-type */
import { FC } from "react";

import ParticleAnimation from "@/components/home/ParticleAnimation";

import BodySection from "@/components/home/BodySection";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-indigo-100">
      <ParticleAnimation />
      <BodySection />
    </div>
  );
};

export default HomePage;
