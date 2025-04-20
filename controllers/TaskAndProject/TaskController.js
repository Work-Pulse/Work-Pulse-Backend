const Task = require("../../models/TaskAndProjectModels/TaskModel");

// Add Task for a Specific User
exports.addTask = async (req, res) => {
    try {
        const { userId, userName, name, priority, duration, description = "No description", deadline } = req.body;

        if (!userId || !userName || !name || !priority || !duration || !deadline) {
            return res.status(400).json({ error: "All required fields must be filled." });
        }

        const newTask = new Task({ userId, userName, name, priority, duration, description, deadline });
        await newTask.save();

        res.status(201).json({ message: "Task added successfully", task: newTask });
    } catch (err) {
        res.status(500).json({ error: "Server error", details: err.message });
    }
};

// Get Tasks for a Specific User
exports.getTasksByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const tasks = await Task.find({ userId });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: "Server error", details: err.message });
    }
};

// Delete a Task by Task ID
exports.deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully", taskId });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Server error", details: error.message });
    }
};
