const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/EmployeeManagement/employeeController");

router.post("/employees", employeeController.createEmployee);
router.get("/employees/:id", employeeController.fetchEmployee);
router.put("/employees/:id", employeeController.updateEmployee);
router.delete("/employees/:id", employeeController.deleteEmployee);
router.get("/employees", employeeController.fetchEmployees);
router.post("/login", employeeController.loginEmployee);



module.exports = router;