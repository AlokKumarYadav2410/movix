const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");

const authMiddleware = async (req, res, next) => {
  try {

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success:false,
        message:"Unauthorized - Token missing"
      });
    }

    const blacklisted = await blacklistModel.findOne({ token });

    if (blacklisted) {
      return res.status(401).json({
        success:false,
        message:"Unauthorized - Token expired"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {
    res.status(401).json({
      success:false,
      message:"Invalid token"
    });
  }
};

module.exports = authMiddleware;