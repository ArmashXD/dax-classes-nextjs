export interface IConstants {
  [key: string]: string | number;
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

class BlogAxiosInstance {
  private postAxiosInstance: AxiosInstance;

  constructor(baseURL: string = 'https://jsonplaceholder.typicode.com') {
    this.postAxiosInstance = axios.create({
      baseURL,
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.postAxiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response) {
          console.error('Response error:', error.response.status, error.response.data);
          switch (error.response.status) {
            case 500:
              console.log('Internal Server Error');
              break;
            case 404:
              console.log('Resource Not Found');
              break;
            case 400:
              console.log('Bad Request');
              break;
            default:
              console.log(`Unhandled status code: ${error.response.status}`);
          }
        } else if (error.request) {
          console.log('Request Error', error.request);
        } else {
          console.log('Network Error', error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.postAxiosInstance.get<T>(url, config);
  }

  public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.postAxiosInstance.post<T>(url, data, config);
  }

  public put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.postAxiosInstance.put<T>(url, data, config);
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.postAxiosInstance.delete<T>(url, config);
  }
}

export const constants: IConstants = {
  API_URL: process.env.NEXT_PUBLIC_API_URL as string,
};

const axiosInstance = new BlogAxiosInstance();
export default axiosInstance;