import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useApi } from "../useApi";
import toast from "react-hot-toast";
import * as storage from "@/utils/storage";

export const useRegisterUser = () => {
  const { handleRequest } = useApi();

  const mutation = useMutation(
    (requestData: { email: string }) =>
      handleRequest(() => axiosInstance.post("/auth/register", requestData)),
    {
      onSuccess: () => {
        toast.success("Registration successful");
      },
    }
  );

  return { ...mutation };
};

export const useLoginUser = () => {
  const { handleRequest } = useApi();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (requestData: { email: string; password: string }) =>
      handleRequest(() => axiosInstance.post("/auth/login", requestData)),
    {
      onSuccess: () => {
        toast.success("Login successful");
      },
    }
  );

  return { ...mutation };
};

export const useLogoutUser = () => {
  const { handleRequest } = useApi();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    () => handleRequest(() => axiosInstance.post("/auth/logout")),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user");
        toast.success("Logout successful");
        storage.clear();
      },
      onError(error: any) {
        console.log(error);
        if (error.response.status === 401) {
          storage.clear();
        }
      },
    }
  );

  return { ...mutation };
};

export const useGetUser = () => {
  const { handleRequest } = useApi();
  const queryKey = ["user"];

  const query = useQuery(queryKey, () =>
    handleRequest(() => axiosInstance.get("/auth/user"))
  );
  return { ...query };
};
