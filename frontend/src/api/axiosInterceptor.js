import { useEffect } from "react";
import axiosInstance from "./axiosInstance";
import useAuth from "../auth/useAuth";

const AxiosInterceptor = () => {
  const { accessToken, refreshAccessToken, logout } = useAuth();

  useEffect(() => {
    // Intercept request: inject accessToken ke header Authorization
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Intercept response: jika 401/403 coba refresh token
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          (error.response?.status === 401 || error.response?.status === 403) &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          const newToken = await refreshAccessToken();

          if (newToken) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axiosInstance(originalRequest);
          } else {
            logout();
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, refreshAccessToken, logout]);

  return null; // ini komponen React yang hanya untuk interceptor
};

export default AxiosInterceptor;
