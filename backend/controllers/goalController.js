//have to download async handler -- npm install express-async-handler --
//use async handler so we don't have to write try/catch blocks
const asyncHandler = require("express-async-handler");

//import models
const Goal = require("../models/goalModel");

//Get goals
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find(); //fetch data from goal model

  res.status(200).json(goals);
});

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
  });

  res.status(200).json(goal);
});

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

  //update
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

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

  await goal.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
