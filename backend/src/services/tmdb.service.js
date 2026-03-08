const axios = require("axios")

const BASE_URL = process.env.TMDB_BASE_URL
const API_KEY = process.env.TMDB_API_KEY

exports.getTrendingMovies = async () => {

    const res = await axios.get(`${BASE_URL}/trending/movie/week`, {
        params: {
            api_key: API_KEY
        }
    })

    return res.data.results
}

exports.getPopularMovies = async () => {

    const res = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
            api_key: API_KEY
        }
    })

    return res.data.results
}

exports.getTopRatedMovies = async () => {
    const res = await axios.get(`${BASE_URL}/movie/top_rated`, {
        params: {
            api_key: API_KEY
        }
    })
    return res.data.results
}

exports.getUpcomingMovies = async () => {

    const res = await axios.get(`${BASE_URL}/movie/upcoming`, {
        params: {
            api_key: API_KEY
        }
    })
    return res.data.results
}

exports.getMovieDetails = async (movieId) => {

    const res = await axios.get(`${BASE_URL}/movie/${movieId}`, {
        params: {
            api_key: API_KEY
        }
    })
    return res.data
}