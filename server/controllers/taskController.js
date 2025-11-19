const Log = require("../models/log");
const Task = require("../models/task");


// Get all tasks with pagination and filterinng
const getTasks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || '';

        const query = search ? {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ]
        } : {};

        // Get total count for pagination
        const total = await Task.countDocuments(query);

        // Get all task
        const tasks = await Task.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        res.json({
            tasks,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalTasks: total
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching tasks' })
    }
};

// Create a new task
const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        const task = new Task({ title, description });
        await task.save();

        //Create audit log
        await Log.create({
            action: 'Create Task',
            taskId: task._id,
            updatedContent: { title, description }
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error while creating task' });
    }
};


// Update a task
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const updatedContent = {};
        if (title !== task.title) updatedContent.title = title;
        if (description !== task.description) updatedContent.description = description;

        // Update task
        task.title = title;
        task.description = description;
        await task.save();

        // Create audit log 
        await Log.create({
            action: 'Update Task',
            taskId: task._id,
            updatedContent
        });

        res.json(task);

    } catch (error) {
        res.status(500).json({ message: 'Server error whle updating task' })
    }
};

//Delete a task
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        await Task.findByIdAndDelete(id);

        // Create audit log
        await Log.create({
            action: 'Delete Task',
            taskId: task._id,
            updatedContent: null
        });

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error while deleting task' });
    }
};

module.exports = { createTask, getTasks, updateTask, deleteTask};