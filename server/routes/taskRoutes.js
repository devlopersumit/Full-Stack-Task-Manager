const express = require('express');
const userAuth = require('../middlewares/auth');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { validateTask } = require('../middlewares/validation');
const taskRouter = express.Router();

// Get all tasks
taskRouter.get('/', getTasks);

// Create a task
taskRouter.post('/', validateTask, createTask);

// Update a task
taskRouter.put('/:id', validateTask, updateTask);

// Delete a task
taskRouter.delete('/:id', deleteTask);

module.exports = taskRouter;