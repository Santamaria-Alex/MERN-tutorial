//have to download async handler -- npm install express-async-handler --
//use async handler so we don't have to write try/catch blocks
const asyncHandler = require("express-async-handler");

//import models
const Goal = require("../models/goalModel");

//import user model
const User = require("../models/userModel");

////////////////////////////////////////////////////////////////
//Get goals
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
  //there is a user field on the goal model
  const goals = await Goal.find({ user: req.user.id }); //fetch data from goal model

  res.status(200).json(goals);
});

////////////////////////////////////////////////////////////////
//Set goals
//@route POST /api/goals
//@access Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  //this is like a PUT request to the DB
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});

////////////////////////////////////////////////////////////////
//Update goals
//@route PUT /api/goals
//@access Private
const updateGoal = asyncHandler(async (req, res) => {
  //search for goal based on ID
  const goal = await Goal.findById(req.params.id);

  //error if goal isn't there based on ID searched
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);

  //check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //goal has a user field, which is an object id, so we need to convert to a string to compare
  //mare sure the logged in user matches the goal user
  //do this so one user can't CRUD onto another user's goals
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  //update
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

////////////////////////////////////////////////////////////////
//Delete goals
//@route DELETE /api/goals
//@access Private
const deleteGoal = asyncHandler(async (req, res) => {
  //get the goal
  const goal = await Goal.findById(req.params.id);

  //error if goal isn't there based on ID searched
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);

  //check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //goal has a user field, which is an object id, so we need to convert to a string to compare
  //mare sure the logged in user matches the goal user
  //do this so one user can't CRUD onto another user's goals
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await goal.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
