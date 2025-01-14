import axiosInstance from "@/lib/axiosInstance";
import { useMutation } from "react-query";
import { useApi } from "../useApi";
import toast from "react-hot-toast";
import axios from "axios";

export const usePredict = () => {
  const { handleRequest } = useApi();

  const mutation = useMutation(
    (requestData: { file: File; model_name: string }) =>
      handleRequest(() =>
        axiosInstance.post("/predict/", requestData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      ),
    {
      onSuccess: () => {
        toast.success("MRI Image processed successfully");
      },
    }
  );

  return { ...mutation };
};
