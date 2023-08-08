const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const crypto = require("crypto");
const { isAuthenticatedUser } = require("../middleware/auth");

//create user
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User Already Exist", 400));

    user = await User.create({
      name,
      email,
      password,
    });

    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

//user log in
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // checking if anything is missing
    if (!email || !password) {
      return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    // console.log(user);
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler(" Invalid email or password", 401));
    }

    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

//logout user
exports.logoutUser = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  } catch (error) {
    next(error);
  }
};


exports.currentUser = async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
}