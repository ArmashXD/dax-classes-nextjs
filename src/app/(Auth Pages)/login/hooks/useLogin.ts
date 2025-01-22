import { LoginValidationSchema } from "@/lib/validations/login-form.validation";
import { useMutation } from "@tanstack/react-query";
import { FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { submitLogin, LoginResponse, LoginDTO } from "../services/submit-login";

export const useLogin = () => {
  const navigate = useRouter();

  const mutation = useMutation<LoginResponse, Error, LoginDTO>({
    mutationFn: async (data: LoginDTO) => {
      const response = await submitLogin(data);
      return response;
    },
    onSuccess: (data) => {
      if (data && data.success) {
        navigateToProfile();
      } else {
        console.log("Login failed");
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const handleSubmit = async (
    values: LoginDTO,
    { setSubmitting, setStatus }: FormikHelpers<LoginDTO>
  ) => {
    try {
      console.log("Login attempt with:", values); // Console log for client-side component

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (mutation.isPaused) {
        console.log("Mutation is paused, waiting for resume...");
        return;
      }

      mutation.mutate(values);
      setStatus("Invalid credentials. Please try again.");
    } catch (error: unknown) {
      console.error(error);
      setStatus("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const navigateToProfile = () => {
    navigate.push("/profile/1");
  };

  return {
    initialValues: { email: "", password: "" },
    validationSchema: LoginValidationSchema,
    handleSubmit,
    navigateToProfile,
    isMutationPaused: mutation.isPaused,
  };
};