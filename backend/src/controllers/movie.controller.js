const movieModel = require("../models/movie.model");
const { getTrendingMovies, getPopularMovies } = require("../services/tmdb.service");
const formatMovie = require("../utils/formatMovie");

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
    res.json({
      success: true,
      movies
    })
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}