const movieModel = require("../models/movie.model");
const { getTrendingMovies, getPopularMovies, getPopularTvShows, getPopularPeople, getTopRatedMovies, getUpcomingMovies, getMovieDetails, getMovieVideos, getMovieCast, getMovieImages, getSimilarMovies, searchMovies, getFullMovieData } = require("../services/tmdb.service");
const cache = require("../utils/cache");
const formatCast = require("../utils/formatCast");
const formatMovie = require("../utils/formatMovie");
const formatPerson = require("../utils/formatPerson");
const formatMovieDetails = require("../utils/formatMovieDetails");

const IMAGE_BASE = "https://image.tmdb.org/t/p";

exports.addMovie = async (req, res) => {
  try {

    const movie = await movieModel.create(req.body);

    res.status(201).json({
      success: true,
      message: "Movie added successfully",
      movie
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getMovies = async (req, res) => {
  try {

    const movies = await movieModel.find();

    res.status(200).json({
      success: true,
      movies
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateMovie = async (req, res) => {
  try {

    const { id } = req.params;

    const movie = await movieModel.findByIdAndUpdate(
      id,
      req.body,
      { returnDocument: "after" }
    );

    res.status(200).json({
      success: true,
      message: "Movie updated",
      movie
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteMovie = async (req, res) => {
  try {

    const { id } = req.params;

    await movieModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Movie deleted"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// exports.getTrendingMovies = async (req, res) => {

//   try {

//     const movies = await getTrendingMovies()

//     const formattedMovies = movies.map(formatMovie)

//     res.json({
//       success: true,
//       movies: formattedMovies
//     })

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       message: error.message
//     })

//   }

// }

exports.getTrendingMovies = async (req, res) => {

  try {

    const page = Number(req.query.page) || 1;
    const cacheKey = `trending:${page}`;

    const cachedMovies = cache.get(cacheKey)

    if (cachedMovies) {
      return res.json({
        success: true,
        movies: cachedMovies,
        source: "cache"
      })
    }

    const movies = await getTrendingMovies(page)

    const formattedMovies = movies.map(formatMovie)

    cache.set(cacheKey, formattedMovies)

    res.json({
      success: true,
      movies: formattedMovies,
      source: "api"
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    })

  }

}

exports.getPopularMovies = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1
    const movies = await getPopularMovies(page)
    const formattedMovies = movies.map(formatMovie)
    res.json({
      success: true,
      movies: formattedMovies
    })
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

exports.getTopRatedMovies = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1
    const movies = await getTopRatedMovies(page)
    const formattedMovies = movies.map(formatMovie)
    res.json({
      success: true,
      movies: formattedMovies
    })
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

exports.getUpcomingMovies = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1
    const movies = await getUpcomingMovies(page)
    const formattedMovies = movies.map(formatMovie)
    res.json({
      success: true,
      movies: formattedMovies
    })
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

exports.getMovieDetails = async (req, res) => {

  try {

    const { id } = req.params

    const movie = await getMovieDetails(id)

    const formattedMovie = formatMovieDetails(movie)

    res.json({
      success: true,
      movie: formattedMovie
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    })

  }
}

exports.getMovieVideos = async (req, res) => {

  try {

    const { id } = req.params

    const videos = await getMovieVideos(id)

    const trailer = videos.find(
      v => v.type === "Trailer" && v.site === "YouTube"
    )

    res.json({
      success: true,
      trailer
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    })

  }
}

exports.getMovieCast = async (req, res) => {

  try {

    const { id } = req.params

    const cast = await getMovieCast(id)

    const formattedCast = cast.slice(0, 10).map(formatCast)

    res.json({
      success: true,
      cast: formattedCast
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    })

  }

}

exports.getSearchMovie = async (req, res) => {

  try {

    const { q } = req.query

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query required"
      })
    }

    const movies = await searchMovies(q)

    const formattedMovies = movies.map(formatMovie)

    res.json({
      success: true,
      movies: formattedMovies
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    })

  }

}

exports.getFullMovie = async (req, res) => {

  try {

    const { id } = req.params
    const mediaType = req.query.type === "tv" ? "tv" : "movie"

    const [data, similar, images] = await Promise.all([
      getFullMovieData(id, mediaType),
      getSimilarMovies(id, mediaType),
      getMovieImages(id, mediaType)
    ])

    const trailer = data.videos.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    ) || data.videos.find((video) => video.site === "YouTube") || null

    const mediaImages = (images?.backdrops || [])
      .filter((item) => Boolean(item?.file_path))
      .slice(0, 12)
      .map((item) => `${IMAGE_BASE}/w1280${item.file_path}`)

    res.json({
      success: true,
      movie: formatMovieDetails(data.movie, mediaType),
      trailer,
      cast: data.cast.slice(0,10).map(formatCast),
      mediaImages,
      similar: similar.slice(0, 12).map(formatMovie)
    })

  } catch (error) {

    res.status(500).json({
      success:false,
      message:error.message
    })

  }

}

exports.getPopularTvShows = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1
    const shows = await getPopularTvShows(page)
    const formattedShows = shows.map(formatMovie)
    res.json({
      success: true,
      shows: formattedShows
    })
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

exports.getPopularPeople = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1
    const people = await getPopularPeople(page)
    const formattedPeople = people.map(formatPerson)
    res.json({
      success: true,
      people: formattedPeople
    })
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}