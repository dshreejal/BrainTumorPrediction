import React, { FC, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, UploadIcon, XIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface PredictPageProps {}

const PredictPage: FC<PredictPageProps> = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true);
    setPrediction(null); // Clear previous prediction

    // Simulating API call
    setTimeout(() => {
      setPrediction(
        "Sample prediction result is displayed here. One of the following: Meningioma, Glioma, Pituitary Tumor, or No Tumor."
      );
      setIsLoading(false);
    }, 2000);

    // Actual API call would look something like this:
    // try {
    //   const formData = new FormData();
    //   formData.append('image', file);
    //   const response = await fetch('/api/predict', {
    //     method: 'POST',
    //     body: formData,
    //   });
    //   const data = await response.json();
    //   setPrediction(data.prediction);
    // } catch (error) {
    //   console.error('Prediction error:', error);
    // } finally {
    //   setIsLoading(false);
    // }
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

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
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
            <div className="py-12">
              <UploadIcon className="mx-auto h-16 w-16 text-gray-400" />
              <p className="mt-4 text-lg text-gray-600">
                Drag and drop your MRI image here, or click to select a file
              </p>
            </div>
          )}
        </div>
        <Button
          onClick={handlePredict}
          disabled={!file || isLoading}
          className="w-full mt-6 bg-purple-600 text-white hover:bg-purple-700 py-3 text-lg"
        >
          {isLoading ? "Predicting..." : "Predict"}
        </Button>
      </div>

      {!isLoading && prediction && (
        <div className="mt-8 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-purple-600">
            Prediction Result
          </h2>
          <p className="text-gray-700">{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default PredictPage;
