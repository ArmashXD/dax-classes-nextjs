import axiosInstance from "@/config/constants/index";


export interface LoginResponse {
  success: boolean;
  message: string;
}

export const submitLogin = async (data: { email: string; password: string }): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>("/posts", data);

  if (!response.data.success) {
    throw new Error("Login failed");
  }

  return response.data;
};

