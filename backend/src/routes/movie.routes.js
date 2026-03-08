const { Router } = require("express");
const movieRouter = Router();

const movieController = require("../controllers/movie.controller");
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

movieRouter.get("/", authMiddleware, movieController.getMovies);
movieRouter.get("/trending", movieController.getTrendingMovies);
movieRouter.get("/popular", movieController.getPopularMovies);
movieRouter.get("/top-rated", movieController.getTopRatedMovies);
movieRouter.get("/popular-tv", movieController.getPopularTvShows);
movieRouter.get("/popular-people", movieController.getPopularPeople);
movieRouter.get("/upcoming", authMiddleware, movieController.getUpcomingMovies);

movieRouter.get("/search", movieController.getSearchMovie);

movieRouter.get("/:id/full", movieController.getFullMovie);

movieRouter.get("/:id", movieController.getMovieDetails);
movieRouter.get("/:id/videos", movieController.getMovieVideos);
movieRouter.get("/:id/cast", movieController.getMovieCast);
movieRouter.post("/", authMiddleware, adminMiddleware, movieController.addMovie);
movieRouter.put("/:id", authMiddleware, adminMiddleware, movieController.updateMovie);
movieRouter.delete("/:id", authMiddleware, adminMiddleware, movieController.deleteMovie);

module.exports = movieRouter;