const errorHandler = require("../utils/errorHandler");
const Task = require("../models/task");
const ErrorHandler = require("../utils/errorHandler");

//create tasks
exports.createTasks = async (req, res, next) => {
  try {
    req.body.createdBy = req.user.id;

    const task = await Task.create(req.body);

    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

//Get all tasks
exports.getAllTasks = async (req, res, next) => {
  try {

    const task = await Task.find({ createdBy: req.user.id });
    // console.log(req.user.id)
    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

//update tasks
exports.updateTasks = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return next(new ErrorHandler("Task not found", 404));

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

//delete task

exports.deleteTasks = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "invalid id",
      });
    }

    await task.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: "Task Delete Successfully",
    });
  } catch (error) {
    next(error);
  }
};
