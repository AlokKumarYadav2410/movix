const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },

    movieId: {
      type: String,
      required: true
    },

    watchedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const historyModel = mongoose.model("history", historySchema);

module.exports = historyModel;