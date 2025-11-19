const express = require('express');
const userAuth = require('../middlewares/auth');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { validateTask } = require('../middlewares/validation');
const router = express.Router();

// Get all tasks
router.get('/', userAuth, getTasks);

// Create a task
router.post('/', userAuth, validateTask, createTask);

// Update a task
router.put('/:id', userAuth, validateTask, updateTask);

// Delete a task
router.delete('/:id', userAuth, deleteTask);

module.exports = router;