const IMAGE_BASE = "https://image.tmdb.org/t/p"

const formatMovieDetails = (movie, mediaType = "movie") => {

  const resolvedMediaType = mediaType === "tv" ? "tv" : (movie?.first_air_date ? "tv" : "movie")
  const runtime = resolvedMediaType === "tv"
    ? (movie.episode_run_time?.[0] ? `${movie.episode_run_time[0]} min` : "Runtime unavailable")
    : (movie.runtime ? `${movie.runtime} min` : "Runtime unavailable")

  return {
    id: movie.id,
    title: movie.title || movie.name,
    description: movie.overview,
    rating: movie.vote_average,
    runtime,
    releaseDate: movie.release_date || movie.first_air_date,
    mediaType: resolvedMediaType,

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