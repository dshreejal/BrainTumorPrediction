import { useCallback, useState } from "react";
// import axiosInstance from "@/lib/axiosInstance";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useApi() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleRequest = useCallback(async function <T>(
    request: () => Promise<T>
  ): Promise<T | undefined> {
    setIsLoading(true);
    try {
      const response = await request();
      setError(null);
      return response;
    } catch (exception: any) {
      setError(exception);
      console.log(exception);

      if (exception.response?.status === 401) {
        toast.error("Unauthorized access. Please login again.", {
          id: "session-expired",
        });
        navigate("/login");
      }
      throw exception;
    } finally {
      setIsLoading(false);
    }
  },
  []);

  return { handleRequest, isLoading, error };
}
