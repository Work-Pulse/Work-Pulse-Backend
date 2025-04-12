const employeeModel = require("../../models/EmployeeManagementModels/employeeModel");
const bcrypt = require("bcryptjs");

// Fetch All Employees
const fetchEmployees = async (req, res) => {
  const employees = await employeeModel.find();
  res.json({ employees });
};

// Fetch Single Employee
const fetchEmployee = async (req, res) => {
  const employeeId = req.params.id;
  const employee = await employeeModel.findById(employeeId);
  res.json({ employee });
};

// Create Employee with Password Hashing
const createEmployee = async (req, res) => {
  const {
    firstName,
    lastName,
    designation,
    department,
    officeMail,
    personalMail,
    officePhone,
    personalPhone,
    joinDate,
    birthday,
    address,
    password,
    confirmPassword
  } = req.body;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = await employeeModel.create({
      firstName,
      lastName,
      designation,
      department,
      officeMail,
      personalMail,
      officePhone,
      personalPhone,
      joinDate,
      birthday,
      address,
      password: hashedPassword,
      confirmPassword: hashedPassword
    });

    res.status(201).json({ employee });
  } catch (error) {
    console.error("Create Employee Error:", error);
    res.status(500).json({ error: "Failed to register employee" });
  }
};

// Update Employee
const updateEmployee = async (req, res) => {
  const employeeId = req.params.id;
  const {
    firstName,
    lastName,
    designation,
    department,
    officeMail,
    personalMail,
    officePhone,
    personalPhone,
    joinDate,
    birthday,
    address,
    password,
    confirmPassword
  } = req.body;

  try {
    // Hash new password (if updated)
    const hashedPassword = await bcrypt.hash(password, 10);

    await employeeModel.findByIdAndUpdate(employeeId, {
      firstName,
      lastName,
      designation,
      department,
      officeMail,
      personalMail,
      officePhone,
      personalPhone,
      joinDate,
      birthday,
      address,
      password: hashedPassword,
      confirmPassword: hashedPassword
    });

    const updatedEmployee = await employeeModel.findById(employeeId);
    res.json({ employee: updatedEmployee });
  } catch (error) {
    console.error("Update Employee Error:", error);
    res.status(500).json({ error: "Failed to update employee" });
  }
};

// Delete Employee
const deleteEmployee = async (req, res) => {
  const employeeId = req.params.id;
  await employeeModel.deleteOne({ _id: employeeId });
  res.json({ success: "Employee deleted" });
};

// Employee Login with officeMail + password
const loginEmployee = async (req, res) => {
  const { officeMail, password } = req.body;

  try {
    const employee = await employeeModel.findOne({ officeMail });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    const isMatch = await bcrypt.compare(password, employee.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      employee: {
        id: employee._id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        designation: employee.designation,
        department: employee.department,
        officeMail: employee.officeMail,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  fetchEmployees,
  fetchEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  loginEmployee
};
