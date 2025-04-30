// routers/EmployeeManagementRouter.js

const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/EmployeeManagement/employeeController");

// Routes
router.post("/employees", employeeController.createEmployee);
router.get("/employees/:id", employeeController.fetchEmployee);
router.put("/employees/:id", employeeController.updateEmployee);
router.delete("/employees/:id", employeeController.deleteEmployee);
router.get("/employees", employeeController.fetchEmployees);
router.post("/employee/login", employeeController.loginEmployee);
router.get("/employee/data/:officeMail", employeeController.getEmployeeData);  // Use the combined function

module.exports = router;
