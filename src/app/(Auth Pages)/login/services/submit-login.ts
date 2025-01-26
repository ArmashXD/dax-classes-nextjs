import axiosInstance from "@/config/axios";

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export const submitLogin = async (data: LoginDTO): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>("/posts", data);

  if (!response.data.success) {
    throw new Error("Login failed");
  }

  return response.data;
};
