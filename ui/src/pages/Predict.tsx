/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { FC, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  InfoIcon,
  UploadIcon,
  XIcon,
  BrainIcon,
  ActivityIcon,
} from "lucide-react";
import { useDropzone } from "react-dropzone";
import { usePredict } from "@/hooks/query/usePredict";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import ReportDialog from "@/components/predict/ReportDialog";
import DoctorsListDialog from "@/components/predict/DoctorsListDialog";
import HospitalsListDialog from "@/components/predict/HospitalsListDialog";

interface PredictPageProps {}

const PredictPage: FC<PredictPageProps> = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState("vgg16");
  const [image, setImage] = useState<string | null>(null);

  const isAuthenticated = useAuth();

  const { mutateAsync, isLoading } = usePredict();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    multiple: false,
  });

  const handlePredict = async () => {
    if (!file) return;
    setPrediction(null);

    try {
      const res = await mutateAsync({ file, model_name: selectedModel });

      if (res?.data?.image) {
        setImage(res?.data?.image);
      }

      switch (res?.data?.prediction) {
        case "glioma":
          setPrediction(
            "Glioma detected. Please consult a doctor for further diagnosis."
          );
          break;
        case "meningioma":
          setPrediction(
            "Meningioma detected. Please consult a doctor for further diagnosis."
          );
          break;
        case "pituitary":
          setPrediction(
            "Pituitary Tumor detected. Please consult a doctor for further diagnosis."
          );
          break;
        case "notumor":
          setPrediction("No Tumor detected. You are healthy!");
          break;
        default:
          setPrediction("Unable to determine. Please consult a doctor.");
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("An error occurred during prediction. Please try again.");
      }
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    setPrediction(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
        Tumor Insight Predict
      </h1>

      <Alert className="mb-6">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Disclaimer</AlertTitle>
        <AlertDescription>
          Please upload an MRI image in JPG, PNG, or JPEG format for prediction.
        </AlertDescription>
      </Alert>

      <div className="grid md:grid-cols-2 gap-6 min-h-96">
        {/* Left Column - Image Upload */}
        <div className="bg-white p-6 rounded-lg shadow-md min-h-[450px]">
          <h2 className="text-xl font-semibold mb-4 text-purple-600">
            Upload MRI Image
          </h2>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? "border-purple-600 bg-purple-50"
                : "border-gray-300 hover:border-purple-400"
            }`}
          >
            <input {...getInputProps()} />
            {preview ? (
              <div className="flex flex-col items-center">
                <img
                  src={preview}
                  alt="Uploaded MRI"
                  className="max-h-64 mb-4 rounded"
                />
                <p className="text-sm text-gray-600 mb-2">{file?.name}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                >
                  <XIcon className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              </div>
            ) : (
              <div className="py-8">
                <UploadIcon className="mx-auto h-36 w-12 text-gray-400" />
                <p className="mt-4 text-gray-600">
                  Drag and drop your MRI image here, or click to select a file
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Model Selection */}
        <div className="flex flex-col">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-purple-600">
              Select Model
            </h2>
            <RadioGroup
              value={selectedModel}
              onValueChange={(value) => {
                setSelectedModel(value);
                if (prediction) {
                  setPrediction(null);
                }
              }}
              className="flex justify-between items-center"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="vgg16" id="vgg16" />
                <Label htmlFor="vgg16" className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <BrainIcon className="h-4 w-4" />
                    <span className="font-medium">VGG16</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Accuracy: 93.60%
                  </span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="resnet50" id="resnet50" />
                <Label htmlFor="resnet50" className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <ActivityIcon className="h-4 w-4" />
                    <span className="font-medium">ResNet50</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Accuracy: 91.31%
                  </span>
                </Label>
              </div>
            </RadioGroup>

            <Button
              onClick={handlePredict}
              disabled={!file || isLoading}
              className="w-full mt-6 bg-purple-600 text-white hover:bg-purple-700 py-6 text-lg"
            >
              {isLoading ? "Predicting..." : "Predict"}
            </Button>
          </div>
          <div>
            {!isLoading && prediction && (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Prediction Result</CardTitle>
                  <CardDescription>
                    Using {selectedModel.toUpperCase()} model
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{prediction}</p>
                </CardContent>
                <div className="mx-2">
                  {isAuthenticated && (
                    <ReportDialog
                      predictionGraph={image}
                      selectedModel={selectedModel}
                    />
                  )}
                </div>
                <div className="mx-2">
                  <DoctorsListDialog />

                  <HospitalsListDialog />
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictPage;
