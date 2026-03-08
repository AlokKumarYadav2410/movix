const movieModel = require("../models/movie.model");
const { getTrendingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies, getMovieDetails, getMovieVideos, getMovieCast, searchMovies } = require("../services/tmdb.service");
const formatCast = require("../utils/formatCast");
const formatMovie = require("../utils/formatMovie");
const formatMovieDetails = require("../utils/formatMovieDetails");

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
      { new: true }
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

exports.getTrendingMovies = async (req, res) => {

  try {

    const movies = await getTrendingMovies()

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

exports.getPopularMovies = async (req, res) => {
  try {
    const movies = await getPopularMovies()
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
    const movies = await getTopRatedMovies()
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
    const movies = await getUpcomingMovies()
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