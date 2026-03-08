const {Router} = require("express");
const movieRouter = Router();

const movieController = require("../controllers/movie.controller");
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

movieRouter.get("/", authMiddleware, movieController.getMovies);
movieRouter.get("/trending", authMiddleware, movieController.getTrendingMovies);
movieRouter.get("/popular", authMiddleware, movieController.getPopularMovies);
movieRouter.post("/", authMiddleware, adminMiddleware, movieController.addMovie);
movieRouter.put("/:id", authMiddleware, adminMiddleware, movieController.updateMovie);
movieRouter.delete("/:id", authMiddleware, adminMiddleware, movieController.deleteMovie);

module.exports = movieRouter;