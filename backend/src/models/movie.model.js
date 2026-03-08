const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    posterUrl: {
      type: String,
      required: true
    },

    description: {
      type: String,
      default: "Description not available"
    },

    movieId: {
      type: String,
      required: true
    },

    releaseDate: {
      type: Date
    },

    trailerUrl: {
      type: String,
      default: ""
    },

    genre: {
      type: String
    },

    category: {
      type: String
    }
  },
  { timestamps: true }
);

const movieModel = mongoose.model("movies", movieSchema);

module.exports = movieModel;