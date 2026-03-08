const {Router} = require("express");
const userRouter = Router();

const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

userRouter.get("/", authMiddleware, adminMiddleware, userController.getUsers);
userRouter.put("/ban/:id", authMiddleware, adminMiddleware, userController.banUser);
userRouter.put("/unban/:id", authMiddleware, adminMiddleware, userController.unbanUser);
userRouter.delete("/:id", authMiddleware, adminMiddleware, userController.deleteUser);

module.exports = userRouter;