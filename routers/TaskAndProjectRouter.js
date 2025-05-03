const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskAndProject/TaskController');
const TaskUserController = require("../controllers/TaskAndProject/TaskUserController");
const LoginController = require("../controllers/TaskAndProject/LoginController");
const ReportController = require('../controllers/TaskAndProject/ReportController');

// User Routes
router.post("/add-user", TaskUserController.addUser);
router.get("/get-users", TaskUserController.getUsers);

// Task Routes
router.post("/add-task", TaskController.addTask);
router.get("/get-all-tasks", TaskController.getAllTasks);
router.get("/get-tasks/:userId", TaskController.getTasksByUser);
router.delete("/delete-task/:taskId", TaskController.deleteTask);
router.put("/update/:taskId", TaskController.updateTask);

router.patch("/update-task-status/:taskId", TaskController.updateTaskStatus);


// Auth/Login Route
router.post("/validate-login", LoginController.validateLogin);

//Reports route
router.get("/completion", ReportController.getTaskCompletionReport);

module.exports = router;
