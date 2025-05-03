
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    name: { type: String, required: true },
    priority: { type: String, enum: ["High", "Medium", "Low"], required: true },
    duration: { type: String, required: true },
    description: { type: String, default: "No description" },
    deadline: { type: String, required: true },

    completed: { type: Boolean, default: false },
});

const TaskModel = mongoose.model('task', TaskSchema);
module.exports = TaskModel;
