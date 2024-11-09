import { PUBLIC_ROUTES } from "@/constants/routes";
import PublicLayout from "@/layouts/PublicLayout";
import HomePage from "@/pages/home";
// import LoginPage from "@/pages/Login";
import {
  // Navigate,
  Outlet,
} from "react-router-dom";

// import { useAuth } from "@/hooks/useAuth";
import PredictPage from "@/pages/Predict";

// const ProtectedRoute = ({ children }: { children: React.JSX.Element }) => {
//   const isAuthenticated = useAuth();

//   if (isAuthenticated) {
//     // If the user is authenticated, redirect them to the home page
//     return <Navigate to={PUBLIC_ROUTES.INDEX} replace />;
//   }

//   return children;
// };

const PublicPages = () => {
  return (
    <>
      <PublicLayout>
        <Outlet />
      </PublicLayout>
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
      // {
      //   path: PUBLIC_ROUTES.LOGIN,
      //   element: (
      //     <ProtectedRoute>
      //       <LoginPage />
      //     </ProtectedRoute>
      //   ),
      // },
      {
        path: PUBLIC_ROUTES.PREDICT,
        element: <PredictPage />,
      },
    ],
  },
];
