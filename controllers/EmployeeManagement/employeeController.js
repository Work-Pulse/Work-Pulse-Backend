const employeeModel = require("../../models/EmployeeManagementModels/employeeModel");
const bcrypt = require("bcryptjs");
const firebaseAdmin = require('firebase-admin');

// Middleware to authenticate using Firebase Token
const authenticate = async (req, res, next) => {
  const { officeMail, firebaseToken } = req.body;

  try {
    // Verify Firebase ID token
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(firebaseToken);

    // Fetch employee data based on officeMail from MongoDB Atlas
    const employee = await employeeModel.findOne({ officeMail });

    if (!employee || employee.officeMail !== officeMail) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    // Attach the decoded token to the request object for later use
    req.user = employee;
    req.firebaseUID = decodedToken.uid;
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

// Fetch All Employees (Authenticated)
const fetchEmployees = async (req, res) => {
  try {
    const employees = await employeeModel.find();
    res.json({ employees });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
};

// Create Employee (Authenticated)
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
      confirmPassword: hashedPassword,
    });

    res.status(201).json({ employee });
  } catch (error) {
    console.error("Create Employee Error:", error);
    res.status(500).json({ error: "Failed to register employee" });
  }
};

// Employee Login with officeMail + firebaseToken (Authenticated)
const loginEmployee = async (req, res) => {
  const { officeMail, firebaseToken } = req.body;

  try {
    // Verify Firebase ID token first
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(firebaseToken);

    // Fetch employee data based on officeMail from MongoDB Atlas
    const employee = await employeeModel.findOne({ officeMail });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // If employee found, send back officeMail and Firebase UID
    res.json({
      message: "Login successful",
      employee: {
        officeMail: employee.officeMail,
        firebaseUID: decodedToken.uid
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
};

// Fetch Employee Details by officeMail (Authenticated)
const getEmployeeData = async (req, res) => {
  const { officeMail } = req.params;

  try {
    const employee = await employeeModel.findOne({ officeMail });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({
      employeeId: employee.employeeId,
      firstName: employee.firstName,
      lastName: employee.lastName,
      designation: employee.designation,
      department: employee.department,
      officeMail: employee.officeMail,
      personalMail: employee.personalMail,
      officePhone: employee.officePhone,
      personalPhone: employee.personalPhone,
      birthday: employee.birthday,
      joinDate: employee.joinDate,
      address: employee.address
    });
  } catch (error) {
    console.error("Error fetching employee data:", error);
    res.status(500).json({ error: "Failed to fetch employee data" });
  }
};

// Update employee details by officeMail
const updateEmployee = async (req, res) => {
  const { officeMail } = req.params;
  const { designation, department, personalMail, personalPhone, address } = req.body;

  try {
    const updated = await employeeModel.findOneAndUpdate(
      { officeMail },
      { designation, department, personalMail, personalPhone, address },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({ message: "Employee updated successfully", employee: updated });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Failed to update employee" });
  }
};

module.exports = {
  fetchEmployees,
  createEmployee,
  loginEmployee,
  getEmployeeData,
  updateEmployee,
  authenticate
};
