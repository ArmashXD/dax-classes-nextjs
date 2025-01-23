import { firebaseAuth } from "@/config/firebase";
import { LoginValidationSchema } from "@/lib/validations/login-form.validation";
import { useMutation } from "@tanstack/react-query";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { LoginDTO, LoginResponse, submitLogin } from "../services/submit-login";

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
      console.log("Login attempt with:", values);

      // await new Promise((resolve) => setTimeout(resolve, 1000));
      createUserWithEmailAndPassword(
        firebaseAuth,
        values.email,
        values.password
      )
        .then((authUser) => {
          console.log(
            "Success. The user is created in Firebase, 'authUser' is: ",
            authUser
          );
          // router.push("/logged_in");
        })
        .catch((error) => {
          // setError(error.message)
          console.log(error);
        });

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
