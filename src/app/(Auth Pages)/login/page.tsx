import axiosInstance from "@/config/constants/index"; // Your axios instance setup
import LoginForm from "./components/login-form";
export interface LoginResponse {
  success: boolean;
  message: string;
}

export const submitLogin = async (data: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  try {
    // Use axios to make the POST request
    const response = await axiosInstance.post<LoginResponse>("/login", data);

    // Check if login was successful
    if (!response.data.success) {
      throw new Error("Login failed");
    }

    // Return response data if login is successful
    return response.data;
  } catch (error: any) {
    // Handle any errors that occurred during the request
    throw new Error(
      error?.response?.data?.message || "An error occurred during login"
    );
  }
};

const Login = () => {
  return <LoginForm />;
};

export default Login;
