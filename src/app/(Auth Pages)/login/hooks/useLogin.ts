// useLogin.ts

import { useMutation } from "@tanstack/react-query";
import { FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { submitLogin } from "../services/submit-login"; // Correct import for submitLogin
import { LoginValidationSchema } from "@/lib/validations/login-form.validation"; // If you have validation schema
import { LoginResponse } from "../page";

interface LoginValues {
  email: string;
  password: string;
}

export const useLogin = () => {
  const router = useRouter();

  // Mutation setup with LoginResponse and LoginValues types
  const mutation = useMutation<LoginResponse, Error, LoginValues>({
    mutationFn: async (data: LoginValues) => {
      try {
        const response = await submitLogin(data);
        return response; // Return the response from the submitLogin API call
      } catch (error) {
        throw new Error("Login failed"); // Throw error if login fails
      }
    },
    onSuccess: (data) => {
      if (data && data.success) {
        navigateToProfile(); // Navigate to profile on success
      } else {
        console.log("Login failed");
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const handleSubmit = async (
    values: LoginValues,
    { setSubmitting, setStatus }: FormikHelpers<LoginValues>
  ) => {
    try {
      console.log("Login attempt with:", values);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Optional delay simulation

      if (mutation.isPaused) {
        console.log("Mutation is paused, waiting for resume...");
        return;
      }

      // mutation.mutate(values); // Submit the login data via mutation
      setStatus("Login successfull");
      // navigateToProfile();
      router.push("/profile/1");
    } catch (error: unknown) {
      console.log(error);
      setStatus("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const navigateToRegister = () => {
    console.log("Executing...");
    
    router.push("/register"); // Navigate to the registration page
  };

  const navigateToProfile = () => {
    router.push("/profile/1"); // Navigate to the profile page (or modify based on dynamic profile ID)
  };

  return {
    initialValues: { email: "", password: "" },
    validationSchema: LoginValidationSchema, // Make sure to import your validation schema
    handleSubmit,
    navigateToRegister,
    navigateToProfile,
    isMutationPaused: mutation.isPaused, // Whether the mutation is paused or not
  };
};
