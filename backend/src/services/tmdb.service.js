const axios = require("axios")

const BASE_URL = process.env.TMDB_BASE_URL
const API_KEY = process.env.TMDB_API_KEY

const normalizeMediaType = (mediaType = "movie") => {
    return mediaType === "tv" ? "tv" : "movie"
}

exports.getTrendingMovies = async (page = 1) => {

    const res = await axios.get(`${BASE_URL}/trending/movie/week`, {
        params: {
            api_key: API_KEY,
            page
        }
    })

    return res.data.results
}

exports.getPopularMovies = async (page = 1) => {

    const res = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
            api_key: API_KEY,
            page
        }
    })

    return res.data.results
}

exports.getPopularTvShows = async (page = 1) => {

    const res = await axios.get(`${BASE_URL}/tv/popular`, {
        params: {
            api_key: API_KEY,
            page
        }
    })

    return res.data.results
}

exports.getPopularPeople = async (page = 1) => {

    const res = await axios.get(`${BASE_URL}/person/popular`, {
        params: {
            api_key: API_KEY,
            page
        }
    })

    return res.data.results
}

exports.getTopRatedMovies = async (page = 1) => {
    const res = await axios.get(`${BASE_URL}/movie/top_rated`, {
        params: {
            api_key: API_KEY,
            page
        }
    })
    return res.data.results
}

exports.getUpcomingMovies = async (page = 1) => {

    const res = await axios.get(`${BASE_URL}/movie/upcoming`, {
        params: {
            api_key: API_KEY,
            page
        }
    })
    return res.data.results
}

exports.getMovieDetails = async (movieId, mediaType = "movie") => {

    const resource = normalizeMediaType(mediaType)

    const res = await axios.get(`${BASE_URL}/${resource}/${movieId}`, {
        params: {
            api_key: API_KEY
        }
    })
    return res.data
}

exports.getMovieVideos = async (movieId, mediaType = "movie") => {

    const resource = normalizeMediaType(mediaType)

    const res = await axios.get(`${BASE_URL}/${resource}/${movieId}/videos`, {
        params: {
            api_key: API_KEY
        }
    })
    return res.data.results
}

exports.getMovieCast = async (movieId, mediaType = "movie") => {
    const resource = normalizeMediaType(mediaType)

    const res = await axios.get(`${BASE_URL}/${resource}/${movieId}/credits`, {
        params: {
            api_key: API_KEY
        }
    })
    return res.data.cast
}

exports.getSimilarMovies = async (movieId, mediaType = "movie") => {

    const resource = normalizeMediaType(mediaType)

    const res = await axios.get(`${BASE_URL}/${resource}/${movieId}/similar`, {
        params: {
            api_key: API_KEY
        }
    })

    return res.data.results
}

exports.getMovieImages = async (movieId, mediaType = "movie") => {

    const resource = normalizeMediaType(mediaType)

    const res = await axios.get(`${BASE_URL}/${resource}/${movieId}/images`, {
        params: {
            api_key: API_KEY
        }
    })

    return res.data
}

exports.searchMovies = async (query) => {

    const res = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
            api_key: API_KEY,
            query: query
        }
    })
    return res.data.results
}

exports.getFullMovieData = async (id, mediaType = "movie") => {

    const resource = normalizeMediaType(mediaType)

  const [details, videos, credits] = await Promise.all([

        axios.get(`${BASE_URL}/${resource}/${id}`, {
      params: { api_key: API_KEY }
    }),

        axios.get(`${BASE_URL}/${resource}/${id}/videos`, {
      params: { api_key: API_KEY }
    }),

        axios.get(`${BASE_URL}/${resource}/${id}/credits`, {
      params: { api_key: API_KEY }
    })

  ])

  return {
    movie: details.data,
    videos: videos.data.results,
    cast: credits.data.cast
  }

}