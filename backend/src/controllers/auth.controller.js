const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const blackListModel = require('../models/blacklist.model');

async function registerUser(req, res) {
    const { name, email, password, role, isBanned } = req.body;

    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
        return res.status(400).json({
            success: false,
            message: "User already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
        name,
        email,
        password: hashedPassword,
        role,
        isBanned
    })

    const token = jwt.sign(
        {
            userId: newUser._id,
            email: newUser.email,
            role: newUser.role
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )

    res.cookie('token', token, { httpOnly: true });

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            isBanned: newUser.isBanned
        }
    })
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            success: false,
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign(
        {
            userId: user._id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )
    res.cookie('token', token, { httpOnly: true });

    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user: {
            name: user.name,
            email: user.email,
            role: user.role,
            isBanned: user.isBanned
        }
    })
}

async function logoutUser(req, res) {
    const token = req.cookies.token;

    if(!token){
        return res.status(400).json({
            success: false,
            message: "Token not found"
        })
    }

    await blackListModel.create({ token });
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "User logged out successfully"
    })
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
}