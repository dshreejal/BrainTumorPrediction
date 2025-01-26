import { FC } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface ReportDialogProps {
  predictionGraph: string | null;
  selectedModel: string;
}

const ReportDialog: FC<ReportDialogProps> = ({
  predictionGraph,
  selectedModel,
}) => {
  const generatePDF = async () => {
    const pdf = new jsPDF("portrait", "px", "a4");
    const pageHeight = pdf.internal.pageSize.height;
    const pageWidth = pdf.internal.pageSize.width;
    let yPosition = 30; // Start position for content on the first page

    // Add a title
    pdf.setFontSize(18);
    pdf.text("Tumor Insight Prediction Report", 20, yPosition);
    yPosition += 30;

    // Function to add images and manage page breaks
    const addImageWithPagination = (
      imgData: string,
      x: number,
      y: number,
      width: number,
      height: number
    ) => {
      // If the image doesn't fit on the current page, add a new page
      if (y + height > pageHeight) {
        pdf.addPage();
        y = 20; // Reset y position for the new page
      }
      pdf.addImage(imgData, "PNG", x, y, width, height);
      return y + height + 20; // Return new y position after the image
    };

    // Add the Prediction Probability section
    pdf.setFontSize(14);
    pdf.text("Prediction Probability", 20, yPosition);
    yPosition += 20;

    if (predictionGraph) {
      // Base64 image
      yPosition = addImageWithPagination(
        `data:image/png;base64,${predictionGraph}`,
        20,
        yPosition,
        pageWidth - 40,
        200 // Adjust height as needed
      );
    }

    // Add Model-Specific Sections
    if (selectedModel === "vgg16") {
      // VGG16 Confusion Matrix
      pdf.text("Model Confusion Matrix (VGG16)", 20, yPosition);
      yPosition += 20;
      yPosition = addImageWithPagination(
        "/images/vgg/vgg16_confusionMatrix.png",
        20,
        yPosition,
        pageWidth - 40,
        200
      );

      // VGG16 Training Metrics
      pdf.text("Model Training Metrics (VGG16)", 20, yPosition);
      yPosition += 20;
      yPosition = addImageWithPagination(
        "/images/vgg/vgg16_metricsGraph.png",
        20,
        yPosition,
        pageWidth - 40,
        200
      );
      yPosition = addImageWithPagination(
        "/images/vgg/vgg16_metrics.png",
        20,
        yPosition,
        pageWidth - 40,
        200
      );
    }

    if (selectedModel === "resnet50") {
      // ResNet50 Confusion Matrix
      pdf.text("Model Confusion Matrix (ResNet50)", 20, yPosition);
      yPosition += 20;
      yPosition = addImageWithPagination(
        "/images/resnet/resnet50_confusionMatrix.png",
        20,
        yPosition,
        pageWidth - 40,
        200
      );

      // ResNet50 Training Metrics
      pdf.text("Model Training Metrics (ResNet50)", 20, yPosition);
      yPosition += 20;
      yPosition = addImageWithPagination(
        "/images/resnet/resnet50_metricsGraph.png",
        20,
        yPosition,
        pageWidth - 40,
        200
      );
      yPosition = addImageWithPagination(
        "/images/resnet/resnet50_metrics.png",
        20,
        yPosition,
        pageWidth - 40,
        200
      );
    }

    // Save the PDF
    pdf.save("TumorInsight_Prediction_Report.pdf");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">View Prediction Report</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[800px] xl:max-w-[1400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between mr-10">
            <h1 className="text-lg font-bold">Report</h1>
            <Button onClick={generatePDF}>Download Report</Button>
          </DialogTitle>
        </DialogHeader>

        <DialogDescription
          id="report-content"
          className="max-h-[800px] overflow-auto flex flex-col gap-8"
        >
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
