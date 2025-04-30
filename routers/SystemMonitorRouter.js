// routers/EmployeeManagementRouter.js
const express = require("express");
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const shiftUsageController = require("../controllers/SystemMonitor/shiftUsageController");


router.post("/shift-usage/save", verifyToken, shiftUsageController.saveShiftUsage);

module.exports = router;
