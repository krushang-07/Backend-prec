import ErrorHandler from "../middlewares.js/error.js";
import { Task } from "../models/task.js";


export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task created",
    });
  } catch (error) {
    next(error);
  }
};


export const getMyTask = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ user: userId });
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};



export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    task.isCompleted = !task.isCompleted;
    await task.save();
    if (!task) return next(new ErrorHandler("task not found", 404)); //error handler call direct for the reduce line

    res.status(200).json({
      success: true,
      message: "task updated",
    });
  } catch (error) {
    next(error);
  }
};




export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new ErrorHandler("task not found", 404)); //error handler call direct for the reduce line
    await task.deleteOne();
    res.status(200).json({
      success: true,
      message: "task deleted",
    });
  } catch (error) {
    next(error);
  }
};
