import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
import { useResetPassword } from "@/hooks/query/useAuthentication";
import toast from "react-hot-toast";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { CiLock } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { PUBLIC_ROUTES } from "@/constants/routes";

const symbolRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const passwordValidator = (password: string) => {
  const hasUppercase = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSymbol = symbolRegex.test(password);
  const isLengthValid = password.length >= 8 && password.length <= 50;

  return hasUppercase && hasDigit && hasSymbol && isLengthValid;
};

const formSchema = z
  .object({
    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .refine((value) => passwordValidator(value), {
        message:
          "Password must contain at least one uppercase letter, one digit, one special character and be at least 8 characters long",
      }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

interface ResetPasswordFormProps {
  token: string;
}

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({
  token,
}: ResetPasswordFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const navigate = useNavigate();

  const { mutateAsync: setupPassword, isLoading } = useResetPassword();

  async function onSubmit(formData: z.infer<typeof formSchema>) {
    try {
      const res = await setupPassword({ ...formData, token: token });
      toast.success(res?.data?.message);
      form.reset();
      navigate(PUBLIC_ROUTES.LOGIN);
    } catch (error: any) {
      console.log(error);

      toast.error(
        error?.response?.data?.error || "An error occurred please try again"
      );
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={`password`}>Password</FormLabel>
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
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={`password`}>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      icon={CiLock}
                      className="focus:border-primary/40 dark:focus:border-primary/30 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-primary/30 focus-visible:ring-primary/30"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      aria-label="Confirm Password"
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
          {!isLoading ? "Reset Password" : ""}
          {isLoading && (
            <>
              <p className="p-2">Saving</p>
              <BiLoaderAlt className="mr-2 h-4 w-4 animate-spin" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
