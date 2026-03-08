import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true
})

export const getTrendingMovies = async () => {
  const response = await api.get("/movies/trending")
  return response.data;
}

export const getPopularMovies = async () => {
  const response = await api.get("/movies/popular")
  return response.data;
}

export const getMovieDetails = async (id) => {
  const response = await api.get(`/movies/${id}`)
  return response.data;
}

export const searchMovies = async (query) => {
  const response = await api.get(`/movies/search?q=${query}`)
  return response.data;
}