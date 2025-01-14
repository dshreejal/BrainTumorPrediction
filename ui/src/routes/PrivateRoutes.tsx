// import { useNavigate } from "react-router-dom";

import { useGetUser } from "@/hooks/query/useAuthentication";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PrivateRoutes({
  children,
  allowedUserRole,
}: {
  children: JSX.Element;
  allowedUserRole: string;
}) {
  console.log("PrivateRoutes", allowedUserRole);
  const navigate = useNavigate();
  let userHasRequiredRole = true;
  const { data, isLoading } = useGetUser();

  if (allowedUserRole) {
    userHasRequiredRole = allowedUserRole.includes(data?.data?.roles)
      ? true
      : false;
  }

  useEffect(() => {
    if (isLoading) return;
    if (!userHasRequiredRole) {
      navigate("/login");
    }
  }, [data, isLoading, navigate, userHasRequiredRole]);

  return children;
}
