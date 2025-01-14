import SetupPasswordForm from "@/components/setupPassword/SetupPasswordForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useVerifyToken } from "@/hooks/query/useAuthentication";
import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";

const SetupPassword: FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const changeType = location.pathname.split("/").pop();

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { mutateAsync: verifyToken } = useVerifyToken();

  const checkTokenValidation = async () => {
    try {
      const response = await verifyToken({ token: token! });
      console.log("response", response);

      setLoading(false);
    } catch (error: any) {
      console.log("error", error);
      setErrorMsg(error.response.data.error);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkTokenValidation();
  }, [token]);

  const spin = useSpring({
    loop: true,
    from: { rotateZ: 0 },
    to: { rotateZ: 360 },
    config: { duration: 1000 },
  });

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center p-4 min-h-[90vh]">
        <animated.div
          style={{
            ...spin,
            width: 50,
            height: 50,
            border: "5px solid #E5E5E5",
            borderTop: "5px solid #7C3AED",
            borderRadius: "50%",
          }}
        />
      </main>
    );
  }

  if (errorMsg !== null) {
    return (
      <main className="flex-1 flex items-center justify-center p-4 min-h-[90vh]">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Oops something went wrong
            </CardTitle>
            <CardDescription className="text-center">
              {errorMsg}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-gray-600">
              Return{" "}
              <Link to="/" className="text-purple-600 hover:underline">
                Home
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex-1 flex items-center justify-center p-4 min-h-[90vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Setup Password
          </CardTitle>
          <CardDescription className="text-center">
            Please enter your new password to setup your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SetupPasswordForm token={token as string} />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-gray-600">
            Note: Password must contain at least one uppercase letter, one
            digit, one special character and be at least 8 characters long
          </div>
          <div className="text-sm text-center text-gray-600">
            Return{" "}
            <Link to="/" className="text-purple-600 hover:underline">
              Home
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
};

export default SetupPassword;
