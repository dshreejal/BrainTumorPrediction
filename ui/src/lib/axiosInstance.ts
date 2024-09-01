// src/lib/axiosInstance.ts
import axios from "axios";
import { storageKey } from "@/constants/storageKey";
import * as storage from "@/utils/storage";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your API URL
  withCredentials: true, // To include cookies in requests
});

// Request interceptor to add access token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = storage.get(storageKey.TOKEN);
    if (token) {
      const decodedToken = atob(token);
      config.headers["Authorization"] = `Bearer ${decodedToken}`;

      // send the csrf token from the cookie of the browser
      const csrfToken =
        document?.cookie
          ?.split("; ")
          ?.find((row) => row?.startsWith("csrf_access_token"))
          ?.split("=")[1] ?? null;

      // if (csrfToken) {
      //   config.headers["X-CSRF-TOKEN"] = csrfToken;
      // }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     // const navigate = useNavigate();
//     if (error.response?.status === 401) {
//       storage.clear();
//       toast.error("Session expired. Please login again.", {
//         id: "session-expired",
//       });
//       // navigate("/login");
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
