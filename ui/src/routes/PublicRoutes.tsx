import { PUBLIC_ROUTES } from "@/constants/routes";
import HomePage from "@/pages/home";
import { Outlet } from "react-router-dom";

const PublicPages = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export const publicRoutes = [
  {
    path: PUBLIC_ROUTES.INDEX,
    element: <PublicPages />,
    children: [
      {
        path: PUBLIC_ROUTES.INDEX,
        element: <HomePage />,
      },
    ],
  },
];
