import React, { FC } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "../ui/scroll-area";
interface ReportDialogProps {
  predictionGraph: string | null;
  selectedModel: string;
}

const ReportDialog: FC<ReportDialogProps> = ({
  predictionGraph,
  selectedModel,
}) => {
  console.log(selectedModel);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">View Prediction Report</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Report</DialogTitle>
        </DialogHeader>

        <DialogDescription className="max-h-[400px] overflow-auto flex flex-col gap-8">
          <div>
            <h3 className="text-sm [&_p]:leading-relaxed font-bold">
              Prediction Probability
            </h3>
            <img
              src={`data:image/png;base64,${predictionGraph}`}
              alt="Prediction Graph"
            />
          </div>

          {selectedModel === "vgg16" && (
            <>
              <div>
                <h3 className="text-sm [&_p]:leading-relaxed font-bold">
                  Model Confusion Matrix
                </h3>
                <img
                  src="/images/vgg/vgg16_confusionMatrix.png"
                  alt="Prediction Graph"
                />
              </div>

              <div>
                <h3 className="text-sm [&_p]:leading-relaxed font-bold">
                  Model Training Metrics
                </h3>
                <img
                  src="/images/vgg/vgg16_metricsGraph.png"
                  alt="Prediction Graph"
                />
                <img
                  src="/images/vgg/vgg16_metrics.png"
                  alt="Prediction Graph"
                  className="mt-2"
                />
              </div>
            </>
          )}

          {selectedModel === "resnet50" && (
            <>
              <div>
                <h3 className="text-sm [&_p]:leading-relaxed font-bold">
                  Model Confusion Matrix
                </h3>
                <img
                  src="/images/resnet/resnet50_confusionMatrix.png"
                  alt="Prediction Graph"
                />
              </div>

              <div>
                <h3 className="text-sm [&_p]:leading-relaxed font-bold">
                  Model Training Metrics
                </h3>
                <img
                  src="/images/resnet/resnet50_metricsGraph.png"
                  alt="Prediction Graph"
                />
                <img
                  src="/images/resnet/resnet50_metrics.png"
                  alt="Prediction Graph"
                  className="mt-2"
                />
              </div>
            </>
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDialog;
