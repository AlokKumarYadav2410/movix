const userModel = require("../models/user.model");

exports.getUsers = async (req, res) => {
  try {

    const users = await userModel.find();

    res.status(200).json({
      success: true,
      users
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.banUser = async (req, res) => {
  try {

    const { id } = req.params;

    const user = await userModel.findByIdAndUpdate(
      id,
      { isBanned: true },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "User banned",
      user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.unbanUser = async (req, res) => {
  try {

    const { id } = req.params;

    const user = await userModel.findByIdAndUpdate(
      id,
      { isBanned: false },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "User unbanned",
      user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {

    const { id } = req.params;

    await userModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "User deleted"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};