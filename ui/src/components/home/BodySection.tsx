/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { FC } from "react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/home/AnimatedSection";
import AboutBrainTumors from "@/components/home/bodySection/AboutBrainTumors";
import CommonSymptoms from "@/components/home/bodySection/CommonSymptoms";
import PotentialCauses from "@/components/home/bodySection/PotentialCauses";
import TreatmentOptions from "@/components/home/bodySection/TreatmentOptions";
import ReadyToUse from "@/components/home/bodySection/ReadyToUse";
import Disclaimer from "@/components/home/bodySection/Disclaimer";

interface BodySectionProps {}

const BodySection: FC<BodySectionProps> = ({}) => {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-purple-900">
                Advanced Brain Tumor Prediction
              </h1>
              <p className="mx-auto max-w-[700px] text-purple-800 md:text-xl">
                Empowering healthcare professionals with AI-driven insights for
                early detection and improved patient outcomes.
              </p>
            </div>
            <div className="space-x-4">
              <Button className="bg-purple-600 text-white hover:bg-purple-700">
                Learn More
              </Button>
              <Button
                variant="outline"
                className="text-purple-600 border-purple-600 hover:bg-purple-100"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
      <AnimatedSection id="about">
        <AboutBrainTumors />
      </AnimatedSection>
      <AnimatedSection id="symptoms">
        <CommonSymptoms />
      </AnimatedSection>
      <AnimatedSection id="causes">
        <PotentialCauses />
      </AnimatedSection>
      <AnimatedSection id="treatment">
        <TreatmentOptions />
      </AnimatedSection>
      <AnimatedSection id="readyToUse">
        <ReadyToUse />
      </AnimatedSection>
      <AnimatedSection id="disclaimer">
        <Disclaimer />
      </AnimatedSection>
    </main>
  );
};

export default BodySection;
