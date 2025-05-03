// routers/EmployeeManagementRouter.js
const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/EmployeeManagement/employeeController");
const verifyToken = require('./../middlewares/authMiddleware');

// Routes
router.post("/employees", verifyToken, employeeController.createEmployee);
router.get("/employees", employeeController.fetchEmployees);//Devram
router.post("/employee/login", verifyToken, employeeController.loginEmployee);
router.get("/employee/data/:officeMail", verifyToken, employeeController.getEmployeeData); 
router.put("/employee/update/:officeMail", verifyToken, employeeController.updateEmployee);
router.delete(
    "/employee/delete/:officeMail",
    verifyToken,
    employeeController.deleteEmployee
  );

module.exports = router;