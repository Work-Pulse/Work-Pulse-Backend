const employeeModel = require("../../models/EmployeeManagementModels/employeeModel");
const bcrypt = require('bcryptjs');

// Fetch all employees
const fetchEmployees = async (req, res) => {
  const employees = await employeeModel.find();
  res.json({ employees: employees });
};

// Fetch single employee
const fetchEmployee = async (req, res) => {
  const employeeId = req.params.id;
  const employee = await employeeModel.findById(employeeId);
  res.json({ employee: employee });
};

// Create new employee (from Firebase-registered user)
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
    password
  } = req.body;

  try {
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

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
    });

    res.status(201).json({ employee });
  } catch (err) {
    console.error("Error creating employee:", err);
    res.status(500).json({ error: "Failed to create employee" });
  }
};

// Login validation
const loginEmployee = async (req, res) => {
  const { officeMail, password } = req.body;

  try {
    const user = await employeeModel.findOne({ officeMail });

    if (!user) {
      return res.status(404).json({ error: "Employee not found with this email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", employee: user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update employee
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
  } = req.body;

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
    password,
  });

  const employee = await employeeModel.findById(employeeId);
  res.json({ employee });
};

// Delete employee
const deleteEmployee = async (req, res) => {
  const employeeId = req.params.id;
  await employeeModel.deleteOne({ _id: employeeId });
  res.json({ success: "Employee deleted" });
};

module.exports = {
  fetchEmployees,
  fetchEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  loginEmployee,
};
