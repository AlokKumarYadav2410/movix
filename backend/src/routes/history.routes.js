const {Router} = require("express");

const historyRouter = Router();

const historyController = require("../controllers/history.controller");
const authMiddleware = require("../middleware/auth.middleware");

historyRouter.post("/", authMiddleware, historyController.addHistory);
historyRouter.get("/", authMiddleware, historyController.getHistory);
historyRouter.delete("/:movieId", authMiddleware, historyController.removeHistoryItem);
historyRouter.delete("/", authMiddleware, historyController.clearHistory);

module.exports = historyRouter; 