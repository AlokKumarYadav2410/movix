const {Router} = require("express");

const favouriteRouter = Router();

const favouriteController = require("../controllers/favourite.controller");
const authMiddleware = require("../middleware/auth.middleware");

favouriteRouter.post("/", authMiddleware, favouriteController.addFavourite);
favouriteRouter.get("/", authMiddleware, favouriteController.getFavourites);
favouriteRouter.delete("/:movieId", authMiddleware, favouriteController.removeFavourite);

module.exports = favouriteRouter;