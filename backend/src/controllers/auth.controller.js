const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(req, res){
    const {name, email, password, role, isBanned} = req.body;

    const isUserExist = await userModel.findOne({email});
    if(isUserExist){
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
        {expiresIn: '1d'}
    )

    res.cookie('token', token, {httpOnly: true});

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

module.exports = {
    registerUser
}