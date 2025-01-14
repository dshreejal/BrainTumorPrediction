import { Card, CardContent } from "@/components/ui/card";
import { animated } from "react-spring";
const AnimatedCard = animated(Card);

export default function PotentialCauses() {
  const causes = [
    {
      title: "Genetic Factors",
      description:
        "Certain genetic conditions can increase the risk of brain tumors.",
    },
    {
      title: "Environmental Exposure",
      description:
        "Exposure to high doses of radiation or certain chemicals may contribute.",
    },
    {
      title: "Immune System Disorders",
      description:
        "Weakened immune systems may increase susceptibility to brain tumors.",
    },
    {
      title: "Age",
      description:
        "The risk of brain tumors increases with age, though they can occur at any age.",
    },
  ];
  return (
    <div className="container px-4 md:px-6">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
        Potential Causes
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {causes.map((cause, index) => (
          <AnimatedCard
            key={index}
            className="bg-white shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2 text-purple-700">
                {cause.title}
              </h3>
              <p className="text-gray-600">{cause.description}</p>
            </CardContent>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
}
