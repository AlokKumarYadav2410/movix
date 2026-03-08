const IMAGE_BASE = "https://image.tmdb.org/t/p"

const formatMovie = (movie) => {

    return {
        id: movie.id,
        title: movie.title || movie.name,
        description: movie.overview || "Description not available",
        rating: movie.vote_average,
        releaseDate: movie.release_date || movie.first_air_date,

        poster: movie.poster_path
            ? `${IMAGE_BASE}/w500${movie.poster_path}`
            : null,

        backdrop: movie.backdrop_path
            ? `${IMAGE_BASE}/original${movie.backdrop_path}`
            : null,

        genres: movie.genre_ids || [],
        voteCount: movie.vote_count || 0,
        voteAverage: movie.vote_average || 0
    }

}

module.exports = formatMovie