const favoriteModel = require("../models/favourite.model");

exports.addFavourite = async (req, res) => {
  try {

    const { movieId } = req.body;
    const userId = req.user.userId;

    if (!movieId) {
      return res.status(400).json({
        success:false,
        message:"Movie ID required"
      });
    }

    const existing = await favoriteModel.findOne({
      userId,
      movieId
    });

    if (existing) {
      return res.status(400).json({
        success:false,
        message:"Movie already in favourites"
      });
    }

    const favourite = await favoriteModel.create({
      userId,
      movieId
    });

    res.status(201).json({
      success:true,
      message:"Movie added to favourites",
      favourite
    });

  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    });
  }
};

exports.getFavourites = async (req, res) => {
  try {

    const userId = req.user.userId;

    const favourites = await favoriteModel.find({ userId });

    res.status(200).json({
      success:true,
      favourites
    });

  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    });
  }
};

exports.removeFavourite = async (req, res) => {
  try {

    const { movieId } = req.params;
    const userId = req.user.userId;

    await favoriteModel.findOneAndDelete({
      userId,
      movieId
    });

    res.status(200).json({
      success:true,
      message:"Movie removed from favourites"
    });

  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    });
  }
};