const express = require('express');
const userAuth = require('../middlewares/auth');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { validateTask } = require('../middlewares/validation');
const taskRouter = express.Router();

// Get all tasks
taskRouter.get('/', userAuth, getTasks);

// Create a task
taskRouter.post('/', userAuth, validateTask, createTask);

// Update a task
taskRouter.put('/:id', userAuth, validateTask, updateTask);

// Delete a task
taskRouter.delete('/:id', userAuth, deleteTask);

module.exports = taskRouter;