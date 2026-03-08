import { apiClient } from "../../../shared/api/client";

export const getAdminMoviesApi = async () => {
  const { data } = await apiClient.get("/movies");
  return data;
};

export const addAdminMovieApi = async (payload) => {
  const { data } = await apiClient.post("/movies", payload);
  return data;
};

export const updateAdminMovieApi = async (id, payload) => {
  const { data } = await apiClient.put(`/movies/${id}`, payload);
  return data;
};

export const deleteAdminMovieApi = async (id) => {
  const { data } = await apiClient.delete(`/movies/${id}`);
  return data;
};

export const getUsersApi = async () => {
  const { data } = await apiClient.get("/users");
  return data;
};

export const banUserApi = async (id) => {
  const { data } = await apiClient.put(`/users/ban/${id}`);
  return data;
};

export const unbanUserApi = async (id) => {
  const { data } = await apiClient.put(`/users/unban/${id}`);
  return data;
};

export const deleteUserApi = async (id) => {
  const { data } = await apiClient.delete(`/users/${id}`);
  return data;
};
