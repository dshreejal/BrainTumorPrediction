import { Navigate, useRoutes } from "react-router-dom";
import NotFound from "@/pages/NotFound";

// import { protectedRoutes } from "./ProtectedRoutes.tsx";
import { publicRoutes } from "./PublicRoutes.tsx";

export default function AppRoutes() {
  const commonRoutes = [
    { path: "*", element: <Navigate to="/404" /> },
    { path: "404", element: <NotFound /> },
  ];

  // const routes = auth ? protectedRoutes : publicRoutes;
  const routes = [...publicRoutes];

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
}
