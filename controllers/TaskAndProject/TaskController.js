const Task = require("../../models/TaskAndProjectModels/TaskModel");

// Add Task for a Specific User
exports.addTask = async (req, res) => {
    try {
        const { userId, userName, name, priority, duration, description, deadline } = req.body;

        if (!userId || !userName || !name || !priority || !duration || !deadline) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newTask = new Task({ userId, userName, name, priority, duration, description, deadline });

        await newTask.save();

        res.status(201).json({ message: "Task added successfully", task: newTask });
    } catch (err) {
        res.status(500).json({ error: "Server error", details: err.message });
    }
};

// Get Tasks by User ID
exports.getTasksByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const tasks = await Task.find({ userId });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// Delete Task
exports.deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        await Task.findByIdAndDelete(taskId);
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};
