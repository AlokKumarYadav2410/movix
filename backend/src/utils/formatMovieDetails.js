const IMAGE_BASE = "https://image.tmdb.org/t/p"

const formatMovieDetails = (movie) => {

  return {
    id: movie.id,
    title: movie.title,
    description: movie.overview,
    rating: movie.vote_average,
    runtime: movie.runtime,
    releaseDate: movie.release_date,

    genres: movie.genres?.map(g => g.name) || [],

    poster: movie.poster_path
      ? `${IMAGE_BASE}/w500${movie.poster_path}`
      : null,

    backdrop: movie.backdrop_path
      ? `${IMAGE_BASE}/original${movie.backdrop_path}`
      : null
  }

}

module.exports = formatMovieDetails