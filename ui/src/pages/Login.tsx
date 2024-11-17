/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserIcon, StethoscopeIcon } from "lucide-react";
import { Link } from "react-router-dom";

import LoginForm from "@/components/login/LoginForm";

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = ({}) => {
  return (
    <main className="flex-1 flex items-center justify-center p-4 min-h-[90vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
          <CardDescription className="text-center">
            Welcome back! Login to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* <Tabs defaultValue="patient" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="patient"
                className="flex items-center justify-center"
              >
                <UserIcon className="w-4 h-4 mr-2" />
                Patient
              </TabsTrigger>
              <TabsTrigger
                value="doctor"
                className="flex items-center justify-center"
              >
                <StethoscopeIcon className="w-4 h-4 mr-2" />
                Doctor
              </TabsTrigger>
            </TabsList>
            <TabsContent value="patient"></TabsContent>
            <TabsContent value="doctor">
              <LoginForm userType="doctor" />
            </TabsContent>
          </Tabs> */}
          <LoginForm />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-purple-600 hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
};

export default LoginPage;
