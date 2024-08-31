// import { useNavigate } from "react-router-dom";

export default function PrivateRoutes({
  children,
  allowedUserRole,
}: {
  children: JSX.Element;
  allowedUserRole: string;
}) {
  console.log("PrivateRoutes", allowedUserRole);

  //   const navigate = useNavigate();

  return children;
}
