import { Card, CardContent } from "@/components/ui/card";

import { animated } from "react-spring";
const AnimatedCard = animated(Card);

export default function TreatmentOptions() {
  const treatments = [
    {
      title: "Surgery",
      description: "Removal of the tumor or a biopsy for diagnosis.",
    },
    {
      title: "Radiation Therapy",
      description: "High-energy beams to kill tumor cells.",
    },
    {
      title: "Chemotherapy",
      description: "Drugs to kill tumor cells throughout the body.",
    },
    {
      title: "Targeted Drug Therapy",
      description: "Drugs that focus on specific abnormalities in tumor cells.",
    },
    {
      title: "Immunotherapy",
      description: "Stimulating the body's immune system to fight tumor cells.",
    },
    {
      title: "Rehabilitation",
      description:
        "Physical therapy, occupational therapy, and speech therapy as needed.",
    },
  ];

  return (
    <div className="container px-4 md:px-6">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center text-indigo-800">
        Treatment Options
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:max-w-6xl mx-auto">
        {treatments.map((treatment, index) => (
          <AnimatedCard
            key={index}
            className="bg-white shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2 text-indigo-700">
                {treatment.title}
              </h3>
              <p className="text-gray-600">{treatment.description}</p>
            </CardContent>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
}
