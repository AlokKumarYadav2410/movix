const historyModel = require("../models/history.model");

exports.addHistory = async (req, res) => {
    try {

        const { movieId } = req.body;
        const userId = req.user.userId;

        const history = await historyModel.create({
            userId,
            movieId
        });

        res.status(201).json({
            success: true,
            message: "History added",
            history
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getHistory = async (req, res) => {
    try {

        const userId = req.user.userId;

        const history = await historyModel
            .find({ userId })
            .sort({ createdAt: -1 })
            .limit(20);

        res.status(200).json({
            success: true,
            history
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.clearHistory = async (req, res) => {
    try {

        const userId = req.user.userId;

        await historyModel.deleteMany({ userId });

        res.status(200).json({
            success: true,
            message: "History cleared"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};