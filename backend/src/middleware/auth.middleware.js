const blacklistModel = require('../models/blacklist.model');
const jwt = require('jsonwebtoken');

async function authMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }

    const isBlacklisted = await blacklistModel.findOne({ token });

    if (isBlacklisted) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }
}

module.exports = authMiddleware;