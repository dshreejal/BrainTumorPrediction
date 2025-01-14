import { PROTECTED_ROUTES, PUBLIC_ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import { Navigate, Outlet } from "react-router-dom";

const App = () => {
  const isAuthenticated = useAuth();
  if (!isAuthenticated) {
    return <Navigate to={PUBLIC_ROUTES.LOGIN} replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

// export const protectedRoutes = [
//   {
//     path: PROTECTED_ROUTES.DASHBOARD,
//     element: (
//       <>
//         <ProtectedLayout>
//           <App />
//         </ProtectedLayout>
//       </>
//     ),
//   },
// ];
