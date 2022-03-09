const jwt = require("jsonwebtoken"); //npm i jsonwebtoken
const bcrypt = require("bcryptjs"); //npm i bcryptjs

//we use asyncHandler to handle exceptions
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@desc Register new user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    //status 201: good and something was created
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});

//@desc Authenticate a user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Login User" });
});

//@desc Get user data
//@route GET /api/users/me ---current logged in user "me"
//@access Public
const getMe = asyncHandler(async (req, res) => {
  res.json({ message: "User data display" });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
