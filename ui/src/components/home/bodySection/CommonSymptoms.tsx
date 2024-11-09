import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangleIcon } from "lucide-react";

import { animated } from "react-spring";
const AnimatedCard = animated(Card);

export default function CommonSymptoms() {
  const symptoms = [
    "Persistent headaches",
    "Seizures",
    "Vision problems",
    "Balance issues",
    "Personality changes",
    "Nausea and vomiting",
  ];
  const symptomsNew = [
    {
      icon: AlertTriangleIcon,
      title: "Persistent headaches",
    },
    {
      icon: AlertTriangleIcon,
      title: "Seizures",
    },
    {
      icon: AlertTriangleIcon,
      title: "Vision problems",
    },
    {
      icon: AlertTriangleIcon,
      title: "Balance issues",
    },
    {
      icon: AlertTriangleIcon,
      title: "Personality changes",
    },
    {
      icon: AlertTriangleIcon,
      title: "Nausea and vomiting",
    },
  ];
  return (
    <div className="container px-4 md:px-6">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
        Common Symptoms
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <ul className="grid gap-4 sm:grid-cols-2">
              {symptoms.map((symptom, index) => (
                <li key={index} className="flex items-center space-x-3 group">
                  <AlertTriangleIcon className="h-5 w-5 text-purple-600 flex-shrink-0 group-hover:text-indigo-600 transition-colors" />
                  <span className="text-gray-700 group-hover:text-indigo-600 transition-colors">
                    {symptom}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card> */}
        {symptomsNew.map((item, index) => (
          <AnimatedCard
            key={index}
            className="bg-white shadow-md hover:shadow-lg transition-shadow"
          >
            <CardContent className="flex flex-col items-center space-y-2 p-6">
              <item.icon className="h-12 w-12 text-purple-600" />
              <h3 className="text-lg font-semibold text-purple-800">
                {item.title}
              </h3>
            </CardContent>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
}
