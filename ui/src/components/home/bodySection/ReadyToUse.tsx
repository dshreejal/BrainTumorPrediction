import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ReadyToUse() {
  return (
    <div className="container px-4 md:px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-lg">
      <div className="flex flex-col items-center space-y-4 text-center py-12">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Ready to use our prediction system?
          </h2>
          <p className="mx-auto max-w-[700px] text-purple-100 md:text-xl/relaxed">
            Our AI-powered system can assist in early detection and diagnosis.
            CLick below to access the prediction tool.
          </p>
        </div>
        {/* <Button className="bg-white text-purple-600 hover:bg-purple-50 hover:text-purple-700">
          Login to Predict
        </Button> */}
        <Link to="/predict">
          <Button className="bg-white text-purple-600 hover:bg-purple-50 hover:text-purple-700">
            Predict Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
