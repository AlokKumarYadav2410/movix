import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true
});

let isInterceptorRegistered = false;

export const setupApiInterceptors = (store) => {
  if (isInterceptorRegistered) {
    return;
  }

  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error?.response?.status;
      const url = String(error?.config?.url || "");
      const isAuthLoginOrRegister = url.includes("/auth/login") || url.includes("/auth/register");

      if (status === 401 && !isAuthLoginOrRegister) {
        store.dispatch({ type: "auth/forceLogout" });
      }

      return Promise.reject(error);
    }
  );

  isInterceptorRegistered = true;
};

export const getErrorMessage = (error, fallback = "Something went wrong") => {
  return error?.response?.data?.message || fallback;
};
