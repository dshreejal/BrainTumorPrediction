import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BiLoaderAlt } from "react-icons/bi";
import { useLoginUser } from "@/hooks/query/useAuthentication";
import toast from "react-hot-toast";
import { CiMail, CiLock } from "react-icons/ci";
import * as storage from "@/utils/storage";
import { storageKey } from "@/constants/storageKey";
import { useApi } from "@/hooks/useApi";
import axiosInstance from "@/lib/axiosInstance";
import { PROTECTED_ROUTES } from "@/constants/routes";

const formSchema = z.object({
  email: z
    .string()
    .min(5, {
      message: "Email must be at least 5 characters.",
    })
    .max(50),

  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

interface LoginFormProps {
  userType: "patient" | "doctor";
}

const LoginForm: FC<LoginFormProps> = ({ userType }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: loginUser, isLoading } = useLoginUser();

  const { handleRequest } = useApi();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log({ ...data, accountType: userType });

    try {
      const res = await loginUser({ ...data, accountType: userType });
      if (res?.data?.access_token) {
        storage.set(storageKey.TOKEN, res.data.access_token);
      }

      const response = await handleRequest(() =>
        axiosInstance.get("/auth/user")
      );
      if (response?.data) {
        storage.set(storageKey.USER_PROFILE, response.data);
      }
      await navigate(PROTECTED_ROUTES.DASHBOARD);
    } catch (error) {
      console.log(error);
      storage.clear();
      toast.error("Invalid email or password", {
        id: "session-expired",
      });
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={`${userType}-email`}>Email</FormLabel>
                <FormControl>
                  <Input
                    icon={CiMail}
                    className="focus:border-primary/40 dark:focus:border-primary/30 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary/30 focus-visible:ring-primary/30"
                    placeholder="Email"
                    aria-label="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={`${userType}-password`}>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      icon={CiLock}
                      className="focus:border-primary/40 dark:focus:border-primary/30 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary/30 focus-visible:ring-primary/30"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      aria-label="Password"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-4 w-4 text-gray-500" />
                      ) : (
                        <EyeIcon className="h-4 w-4 text-gray-500" />
                      )}
                      <span className="sr-only">
                        Toggle password visibility
                      </span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-purple-600 text-white hover:bg-purple-700"
        >
          {!isLoading ? "Login" : ""}
          {isLoading && (
            <>
              <p className="p-2">Logging In</p>
              <BiLoaderAlt className="mr-2 h-4 w-4 animate-spin" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
