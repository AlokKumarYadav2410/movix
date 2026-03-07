const {Router} = require('express');
const authRouter = Router();
const authController = require('../controllers/auth.controller');

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post('/register', authController.registerUser);


module.exports = authRouter;