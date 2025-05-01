// routers/EmployeeManagementRouter.js
const express = require("express");
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const shiftUsageController = require("../controllers/SystemMonitor/shiftUsageController");

router.post("/shift-usage/save", verifyToken, shiftUsageController.saveShiftUsage);
router.get("/shift-usage/fetchAll", shiftUsageController.getAllShiftData);
router.get("/shift-usage/employee/:employeeId", shiftUsageController.getShiftDataByEmployeeId);
router.get("/employee-info/:employeeId", shiftUsageController.getEmployeeInfoFromShiftUsage);

module.exports = router;
