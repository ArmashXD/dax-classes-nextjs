import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormikHelpers } from "formik";
import { submitRegister } from "../services/submit-register";
import { RegisterValidationSchema } from "@/lib/validations/register-form.validation";

interface RegisterValues {
  email: string;
  password: string;
}

export const useRegister = () => {
  const navigate = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: RegisterValues) => {
      try {
        const response = await submitRegister(data);
        return response;  // Assuming response contains success/failure data
      } catch (error) {
        throw error;  // Error handling can be customized
      }
    },
    onSuccess: (data: any) => {
      if (data?.success) {
        navigate.push("/login");  // Redirect to login page on success
      }
    },
    onError: (error: any) => {
      console.error("Registration failed:", error);
    },
  });

  const handleSubmit = async (
    values: RegisterValues,
    { setSubmitting, setStatus }: FormikHelpers<RegisterValues>
  ) => {
    try {
      setStatus("");  // Reset previous status message
      await mutation.mutateAsync(values);  // Trigger mutation with form values
    } catch (error) {
      console.error("Error during mutation:", error);
      setStatus("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);  // Set submitting state to false after mutation
    }
  };

  return {
    initialValues: { email: "", password: "" },
    validationSchema: RegisterValidationSchema,
    handleSubmit,
    mutation,
  };
};
