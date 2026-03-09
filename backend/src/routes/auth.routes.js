const { Router } = require('express');
const authRouter = Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post('/register', authController.registerUser);

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */
authRouter.post('/login', authController.loginUser);

/**
 * @route POST /api/auth/logout
 * @desc Logout a user
 * @access Public
 */
authRouter.post('/logout', authController.logoutUser);

module.exports = authRouter;