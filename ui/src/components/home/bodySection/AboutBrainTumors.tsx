import { Card, CardContent } from "@/components/ui/card";
import {
  AlertTriangleIcon,
  ActivityIcon,
  HeartPulseIcon,
  StethoscopeIcon,
} from "lucide-react";

import { animated } from "react-spring";
const AnimatedCard = animated(Card);

export default function AboutBrainTumors() {
  const features = [
    {
      icon: AlertTriangleIcon,
      title: "Early Detection",
      description: "Critical for improved treatment outcomes",
    },
    {
      icon: ActivityIcon,
      title: "Precise Diagnosis",
      description: "Utilizing advanced imaging techniques",
    },
    {
      icon: HeartPulseIcon,
      title: "Personalized Care",
      description: "Tailored treatment plans for each patient",
    },
    {
      icon: StethoscopeIcon,
      title: "Expert Support",
      description: "Collaboration with healthcare professionals",
    },
  ];
  return (
    <div className="container px-4 md:px-6">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
        About Brain Tumors
      </h2>
      <p className="mx-auto max-w-[700px] text-gray-600 md:text-lg/relaxed text-center mb-12">
        Brain tumors are abnormal growths of cells in the brain. They can be
        benign (non-cancerous) or malignant (cancerous), and can significantly
        impact neurological functions depending on their size and location.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((item, index) => (
          <AnimatedCard
            key={index}
            className="bg-white shadow-md hover:shadow-lg transition-shadow"
          >
            <CardContent className="flex flex-col items-center space-y-2 p-6">
              <item.icon className="h-12 w-12 text-purple-600" />
              <h3 className="text-lg font-semibold text-purple-800">
                {item.title}
              </h3>
              <p className="text-gray-600 text-center">{item.description}</p>
            </CardContent>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
}
