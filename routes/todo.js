const express = require('express');

const router = express.Router();
const { createTask, getAllTasks, getSingleTask, deleteTask, updateTask } = require('../controllers/todo.controller.js');

// read
router.get('/', getAllTasks);

// /:id => req.params = {id : ...}
router.get('/:id', getSingleTask);

// create
router.post('/', createTask);

// delete
router.delete('/:id', deleteTask);

// update
router.patch('/:id', updateTask);

module.exports = router;
