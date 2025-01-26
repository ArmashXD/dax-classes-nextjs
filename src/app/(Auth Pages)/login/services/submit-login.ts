import axiosInstance from "@/config/axios";
import { Auth } from "firebase/auth";

export interface LoginDTO {
  email: string; // User's email
  username: string; // User's username
  password: string; // User's password
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const submitLogin = async (data: LoginDTO): Promise<LoginResponse> => {
  try {
    console.log("Submitting login with data:", data);

    const response = await axiosInstance.post<LoginResponse>("/posts", data);

    if (!response.data.success) {
      console.error("Login failed:", response.data.message);
      throw new Error("Login failed");
    }

    return response.data;
  } catch (error) {
    console.error("Error during login request:", error);
    throw error; // Re-throw the error so the calling function can handle it
  }
};
