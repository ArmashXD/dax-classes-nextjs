import { LoginValidationSchema } from "@/lib/validations/login-form.validation";
import { useMutation } from "@tanstack/react-query";
import { FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { LoginDTO, submitLogin } from "../services/submit-login";
import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: LoginDTO) => {
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
    values: LoginDTO,
    { setSubmitting, setStatus }: FormikHelpers<LoginDTO>
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

  const navigateToProfile = () => {
    router.push("/profile/1");
  };

  return {
    initialValues: { email: "", password: "" },
    validationSchema: LoginValidationSchema,
    handleSubmit,
    navigateToProfile,
    navigateToRegister,
    isMutationPaused: mutation.isPaused,
  };
};
