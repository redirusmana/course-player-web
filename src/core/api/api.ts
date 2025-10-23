import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
const API_URL =
  import.meta.env.VITE_API_BASE_URL ?? "https://staging.skilskul.co.id/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      console.error(
        "401 Unauthorized: Token / Cookie Expired atau Gagal Diset."
      );
    }
    return Promise.reject(error);
  }
);

export default api;
