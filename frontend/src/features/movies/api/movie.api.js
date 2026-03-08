import { apiClient } from "../../../shared/api/client";

export const getTrendingMoviesApi = async (page = 1) => {
  const { data } = await apiClient.get(`/movies/trending?page=${page}`);
  return data;
};

export const getPopularMoviesApi = async (page = 1) => {
  const { data } = await apiClient.get(`/movies/popular?page=${page}`);
  return data;
};

export const getPopularTvShowsApi = async (page = 1) => {
  const { data } = await apiClient.get(`/movies/popular-tv?page=${page}`);
  return data;
};

export const getPopularPeopleApi = async (page = 1) => {
  const { data } = await apiClient.get(`/movies/popular-people?page=${page}`);
  return data;
};

export const getTopRatedMoviesApi = async (page = 1) => {
  const { data } = await apiClient.get(`/movies/top-rated?page=${page}`);
  return data;
};

export const getUpcomingMoviesApi = async (page = 1) => {
  const { data } = await apiClient.get(`/movies/upcoming?page=${page}`);
  return data;
};

export const searchMoviesApi = async (query) => {
  const { data } = await apiClient.get(`/movies/search?q=${encodeURIComponent(query)}`);
  return data;
};

export const getFullMovieApi = async (movieId) => {
  const { data } = await apiClient.get(`/movies/${movieId}/full`);
  return data;
};

export const getMovieDetailsApi = async (movieId) => {
  const { data } = await apiClient.get(`/movies/${movieId}`);
  return data;
};
