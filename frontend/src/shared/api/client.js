import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true
});

export const getErrorMessage = (error, fallback = "Something went wrong") => {
  return error?.response?.data?.message || fallback;
};
