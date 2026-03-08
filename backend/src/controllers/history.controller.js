const historyModel = require("../models/history.model");
const mongoose = require("mongoose");

exports.addHistory = async (req, res) => {
    try {

        const { movieId } = req.body;
        const userId = req.user.userId;

        const history = await historyModel.findOneAndUpdate(
            { userId, movieId: String(movieId) },
            { $set: { watchedAt: new Date() } },
            {
                upsert: true,
                returnDocument: "after",
                setDefaultsOnInsert: true
            }
        );

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

        const history = await historyModel.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $sort: {
                    watchedAt: -1,
                    createdAt: -1
                }
            },
            {
                $group: {
                    _id: "$movieId",
                    latest: { $first: "$$ROOT" }
                }
            },
            {
                $replaceRoot: {
                    newRoot: "$latest"
                }
            },
            {
                $sort: {
                    watchedAt: -1,
                    createdAt: -1
                }
            },
            {
                $limit: 20
            }
        ]);

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