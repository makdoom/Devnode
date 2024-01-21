import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

type errorType = {
  success: boolean;
  statusCode: number;
  stack: string;
  message: string;
};

export type CustomAxiosError = AxiosError<errorType>;

// Create a custom axios instance
const Axios: AxiosInstance = axios.create({
  baseURL: "/api/v1", // Set your API base URL
  timeout: 7000, // Set the timeout for requests
});

// Add request interceptor
Axios.interceptors.request.use(
  (config) => {
    // You can modify the request config here (e.g., add headers)
    return config;
  },
  (error: CustomAxiosError) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
Axios.interceptors.response.use(
  (response: AxiosResponse) => {
    // You can modify the response data here
    return response;
  },
  (error: CustomAxiosError) => {
    // Handle errors globally (e.g., redirect to login page for unauthorized requests)
    if (error.response?.status === 401) {
      // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default Axios;
