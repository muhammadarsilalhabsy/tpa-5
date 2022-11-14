const Todo = require('../models/todo.js');

const createTask = async (req, res) => {
  const data = req.body;
  const todo = await Todo.create(data.task, data.active);
  // 201 = created
  res.status(201).json({
    success: true,
    data: todo,
    message: 'Task is created successfully',
  });
};

const updateTask = async (req, res) => {
  const data = req.body;
  const existTask = await Todo.findOne({ _id: req.params.id }).select('-__v');

  if (existTask) {
    existTask.task = data.task;
    existTask.active = data.active;
    const updatedTask = await existTask.save();
    res.status(200).json({
      success: true,
      data: updatedTask,
      message: 'Task is updated successfully',
    });
  } else {
    res.status(401).json({
      success: false,
      data: null,
      message: 'Task is Not Found',
    });
  }
};

const deleteTask = async (req, res) => {
  const existTask = await Todo.findOne({ _id: req.params.id });
  if (existTask) {
    await existTask.remove();
    res.status(200).json({
      success: true,
      message: 'Task is deleted successfully',
    });
  } else {
    res.status(401).json({
      success: false,
      data: null,
      message: 'Task is Not Found',
    });
  }
};

const getSingleTask = async (req, res) => {
  const existTask = await Todo.findOne({ _id: req.params.id }).select('-__v');
  if (existTask) {
    res.status(200).json({
      success: true,
      data: existTask,
      message: 'Task is fetched successfully',
    });
  } else {
    res.status(401).json({
      success: false,
      data: null,
      message: 'Task is Not Found',
    });
  }
};

const getAllTasks = async (req, res) => {
  const allTasks = await Todo.find({}, '-__v');
  if (allTasks) {
    res.status(200).json({
      success: true,
      data: allTasks,
      message: 'All Tasks is fetched successfully',
    });
  } else {
    res.status(401).json({
      success: false,
      data: null,
      message: 'Tasks are Not Found',
    });
  }
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getSingleTask,
  getAllTasks,
};
