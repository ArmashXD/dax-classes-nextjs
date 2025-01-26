import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LoginDTO, LoginResponse, submitLogin } from "../services/submit-login";
import Cookies from "js-cookie";

export const useLogin = () => {
  const navigate = useRouter();

  const mutation = useMutation<LoginResponse, Error, LoginDTO>({
    mutationFn: async (data: LoginDTO) => {
      const response = await submitLogin(data);
      return response;
    },
    onSuccess: (data) => {
      if (data && data.success) {
        if (data.token) {
          Cookies.set("token", data.token);
        }
        navigateToProfile();
      } else {
        console.log("Login failed");
      }
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
    },
  });
  const navigateToProfile = () => {
    navigate.push("/profile/1");
  };

  return {
    mutation,
  };
};
