const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { generateToken } = require("../utils/generateToken");

// @desc    Auth user and get token
// @route   POST /api/users/login
// @access  Public

exports.authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// @desc   Get user profile
// @route   GET /api/users/profile
// @access  Private

exports.getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private

exports.updateUserProfile = asyncHandler(async (req, res) => {
  // const {name,email}=req.data;

  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    return res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

// @desc    Create new User
// @route   POST /api/users/
// @access  Public

exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201);
    return res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Return all users
// @route   GET /api/users/
// @access  Private/Admin

exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  res.json(users);
});

// @desc    Delete user by id
// @route   DELETE /api/users/:id
// @access  Private/Admin

exports.deleteUserById = asyncHandler(async (req, res) => {
  const user = User.findById(req.params.id);
  if (user) {
    await user.remove();
    return res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
