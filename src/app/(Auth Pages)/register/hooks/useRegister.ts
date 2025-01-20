import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IRegisterFormData } from "../types";
import { submitRegister } from "../services/submit-register";
import { toast } from "sonner";
import * as Yup from "yup";

export const RegisterValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const useRegister = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: IRegisterFormData) => {
      return await submitRegister(data);
    },
    onSuccess: () => {
      toast.success("Registration successful!");
      router.push("/login");
    },
    onError: (error: Error) => {
      toast.error(error.message || "An error occurred during registration");
    },
  });

  return {
    mutation,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}; 