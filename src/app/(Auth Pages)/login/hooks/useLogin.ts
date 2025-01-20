import { LoginValidationSchema } from "@/lib/validations/login-form.validation";
import { useMutation } from "@tanstack/react-query";
import { FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { submitLogin } from "../services/submit-login";

interface LoginValues {
  email: string;
  password: string;
}

export const useLogin = () => {
  const navigate = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: LoginValues) => {
      try {
        const response = await submitLogin(data);
        return response;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: async (data) => {
      if (data.success) {
        navigateToRegister();
      }
    },
    onError: () => {},
  });

  const handleSubmit = async (
    values: LoginValues,
    { setSubmitting, setStatus }: FormikHelpers<LoginValues>
  ) => {
    try {
      console.log("Login attempt with:", values);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("Invalid credentials. Please try again.");
      mutation.mutate(values);
    } catch (error: unknown) {
      console.log(error);
      setStatus("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const navigateToRegister = () => {
    navigate.push("/profile/1");
  };

  return {
    initialValues: { email: "", password: "" },
    validationSchema: LoginValidationSchema,
    handleSubmit,
    navigateToRegister,
  };
};
