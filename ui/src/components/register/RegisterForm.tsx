import { FC } from "react";
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
import { useRegisterUser } from "@/hooks/query/useAuthentication";
import toast from "react-hot-toast";
import { CiMail } from "react-icons/ci";

const formSchema = z.object({
  email: z
    .string()
    .email()
    .min(5, {
      message: "Email must be at least 5 characters.",
    })
    .max(50),
});

interface RegisterFormProps {}

const RegisterForm: FC<RegisterFormProps> = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutateAsync: registerUser, isLoading } = useRegisterUser();

  async function onSubmit(formData: z.infer<typeof formSchema>) {
    try {
      const res = await registerUser({ ...formData });
      toast.success(res?.data?.message);
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={`email`}>Email</FormLabel>
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
        <Button
          type="submit"
          className="w-full bg-purple-600 text-white hover:bg-purple-700"
        >
          {!isLoading ? "Register" : ""}
          {isLoading && (
            <>
              <p className="p-2">Creating User</p>
              <BiLoaderAlt className="mr-2 h-4 w-4 animate-spin" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
