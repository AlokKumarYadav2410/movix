import { apiClient } from "../../../shared/api/client";

export const getFavouritesApi = async () => {
  const { data } = await apiClient.get("/favourites");
  return data;
};

export const addFavouriteApi = async (movieId) => {
  const { data } = await apiClient.post("/favourites", { movieId: String(movieId) });
  return data;
};

export const removeFavouriteApi = async (movieId) => {
  const { data } = await apiClient.delete(`/favourites/${movieId}`);
  return data;
};

export const getHistoryApi = async () => {
  const { data } = await apiClient.get("/history");
  return data;
};

export const addHistoryApi = async (movieId) => {
  const { data } = await apiClient.post("/history", { movieId: String(movieId) });
  return data;
};

export const clearHistoryApi = async () => {
  const { data } = await apiClient.delete("/history");
  return data;
};

export const removeHistoryItemApi = async (movieId) => {
  const { data } = await apiClient.delete(`/history/${movieId}`);
  return data;
};
