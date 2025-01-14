import ForgotPasswordForm from "@/components/forgotPassword/ForgotPasswordForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <main className="flex-1 flex items-center justify-center p-4 min-h-[90vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-center">
            Please enter your email to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
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
