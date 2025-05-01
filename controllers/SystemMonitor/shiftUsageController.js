// controllers/EmployeeManagement/shiftUsageController.js
const ShiftUsage = require("../../models/SystemMonitorModels/shiftUsageModel");

//Save Shift Record
const saveShiftUsage = async (req, res) => {
  try {
    const {
      officeMail,
      employeeId,
      firstName,
      lastName,
      designation,
      department,
      startTime,
      endTime,
      totalTime,
      usageMap,
    } = req.body;

    const usageArray = Object.entries(usageMap).map(([app, time]) => ({
      appName: app,
      usageInSeconds: time,
    }));

    const newEntry = new ShiftUsage({
      officeMail,
      employeeId,
      firstName,
      lastName,
      designation,
      department,
      startTime,
      endTime,
      totalTime,
      applicationUsage: usageArray,
    });

    await newEntry.save();
    res.status(201).json({ message: "Shift data saved successfully" });
  } catch (error) {
    console.error("Error saving shift data:", error);
    res.status(500).json({ error: "Failed to save shift data" });
  }
};

//Fetch All shift Records
const getAllShiftData = async (req, res) => {
  try {
    const shiftData = await ShiftUsage.find().select('employeeId firstName lastName designation department'); // Select only required fields
    res.status(200).json(shiftData);
  } catch (error) {
    console.error("Error fetching shift data:", error);
    res.status(500).json({ error: "Failed to fetch shift data" });
  }
};

// Fetch All Shift Sessions for a Specific Employee
const getShiftDataByEmployeeId = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const shiftData = await ShiftUsage.find({ employeeId: parseInt(employeeId) });

    if (!shiftData || shiftData.length === 0) {
      return res.status(404).json({ error: "No shift records found for this employee" });
    }

    res.status(200).json(shiftData);
  } catch (error) {
    console.error("Error fetching shift data:", error);
    res.status(500).json({ error: "Failed to fetch shift data" });
  }
};

const getEmployeeInfo = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const employee = await EmployeeModel.findOne({ employeeId: parseInt(employeeId) });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json({
      firstName: employee.firstName,
      lastName: employee.lastName,
      department: employee.department,
      designation: employee.designation,
    });
  } catch (error) {
    console.error("Error fetching employee data:", error);
    res.status(500).json({ error: "Failed to fetch employee data" });
  }
};

// Fetch Employee Data (firstName, lastName, department, designation)
const getEmployeeInfoFromShiftUsage = async (req, res) => {
  try {
    const { employeeId } = req.params;

    // Find the employee data in the ShiftUsage collection based on employeeId
    const employeeData = await ShiftUsage.findOne({ employeeId: parseInt(employeeId) }).select('firstName lastName department designation');

    if (!employeeData) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Respond with the employee details
    res.status(200).json({
      firstName: employeeData.firstName,
      lastName: employeeData.lastName,
      department: employeeData.department,
      designation: employeeData.designation,
    });
  } catch (error) {
    console.error("Error fetching employee data from ShiftUsage:", error);
    res.status(500).json({ error: "Failed to fetch employee data" });
  }
};

module.exports = {
  saveShiftUsage,
  getAllShiftData,
  getShiftDataByEmployeeId,
  getEmployeeInfoFromShiftUsage,
};
