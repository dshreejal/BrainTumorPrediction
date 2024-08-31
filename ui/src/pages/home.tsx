/* eslint-disable @typescript-eslint/no-empty-object-type */
import { FC } from "react";

import Navbar from "@/components/common/Navbar";
import ParticleAnimation from "@/components/home/ParticleAnimation";

import BodySection from "@/components/home/BodySection";
import Footer from "@/components/common/Footer";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-indigo-100">
      <ParticleAnimation />
      <Navbar />
      <BodySection />
      <Footer />
    </div>
  );
};

export default HomePage;
