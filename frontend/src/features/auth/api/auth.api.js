import { apiClient } from "../../../shared/api/client";

export const registerUserApi = async (payload) => {
  const { data } = await apiClient.post("/auth/register", payload);
  return data;
};

export const loginUserApi = async (payload) => {
  const { data } = await apiClient.post("/auth/login", payload);
  return data;
};

export const logoutUserApi = async () => {
  const { data } = await apiClient.post("/auth/logout");
  return data;
};
