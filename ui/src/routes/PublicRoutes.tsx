import { PUBLIC_ROUTES } from "@/constants/routes";
import PublicLayout from "@/layouts/PublicLayout";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/Login";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import PredictPage from "@/pages/Predict";
import RegisterPage from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import SetupPassword from "@/pages/SetupPassword";
import AboutPage from "@/pages/About";

const ProtectedRoute = ({ children }: { children: React.JSX.Element }) => {
  const isAuthenticated = useAuth();

  if (isAuthenticated) {
    // If the user is authenticated, redirect them to the home page
    return <Navigate to={PUBLIC_ROUTES.INDEX} replace />;
  }

  return children;
};

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
      {
        path: PUBLIC_ROUTES.ABOUT,
        element: <AboutPage />,
      },
      {
        path: PUBLIC_ROUTES.LOGIN,
        element: (
          <ProtectedRoute>
            <LoginPage />
          </ProtectedRoute>
        ),
      },
      {
        path: PUBLIC_ROUTES.REGISTER,
        element: (
          <ProtectedRoute>
            <RegisterPage />
          </ProtectedRoute>
        ),
      },
      {
        path: PUBLIC_ROUTES.FORGOT_PASSWORD,
        element: (
          <ProtectedRoute>
            <ForgotPassword />
          </ProtectedRoute>
        ),
      },
      {
        path: PUBLIC_ROUTES.RESET_PASSWORD,
        element: (
          <ProtectedRoute>
            <ResetPassword />
          </ProtectedRoute>
        ),
      },
      {
        path: PUBLIC_ROUTES.SETUP_PASSWORD,
        element: (
          <ProtectedRoute>
            <SetupPassword />
          </ProtectedRoute>
        ),
      },
      {
        path: PUBLIC_ROUTES.PREDICT,
        element: <PredictPage />,
      },
    ],
  },
];
