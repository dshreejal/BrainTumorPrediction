import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangleIcon } from "lucide-react";

export default function CommonSymptoms() {
  const symptoms = [
    "Persistent headaches",
    "Seizures",
    "Vision problems",
    "Balance issues",
    "Personality changes",
    "Nausea and vomiting",
  ];
  return (
    <div className="container px-4 md:px-6">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center text-purple-800">
        Common Symptoms
      </h2>
      <div className="max-w-3xl mx-auto">
        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
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
        </Card>
      </div>
    </div>
  );
}
