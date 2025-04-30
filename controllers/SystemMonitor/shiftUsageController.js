// controllers/EmployeeManagement/shiftUsageController.js
const ShiftUsage = require("../../models/SystemMonitorModels/shiftUsageModel");

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

module.exports = { saveShiftUsage };
