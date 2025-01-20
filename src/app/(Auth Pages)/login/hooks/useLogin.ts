import { LoginValidationSchema } from "@/lib/validations/login-form.validation";
import { useMutation } from "@tanstack/react-query";
import { FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { submitLogin } from "../services/submit-login";
import { toast } from "sonner";

interface LoginValues {
  email: string;
  password: string;
}

export const useLogin = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: LoginValues) => {
      return await submitLogin(data);
    },
    onSuccess: (data) => {
      toast.success("Login successful!");
      router.push("/profile");
    },
    onError: (error: Error) => {
      toast.error(error.message || "An error occurred during login");
    },
  });
  const navigateToRegister = () => {
    router.push("/register"); 
  };
  const handleSubmit = async (
    values: LoginValues,
    { setSubmitting, setStatus }: FormikHelpers<LoginValues>
  ) => {
    try {
      await mutation.mutateAsync(values);
    } catch (error) {
      console.error(error);
      setStatus("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    initialValues: { email: "", password: "" },
    validationSchema: LoginValidationSchema,
    navigateToRegister,
    handleSubmit,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
