// models/ShiftUsageModel.js
const mongoose = require("mongoose");

const ShiftUsageSchema = new mongoose.Schema({
  officeMail: { type: String, required: true },
  employeeId: { type: Number },
  firstName: String,
  lastName: String,
  designation: String,
  department: String,

  startTime: String,
  endTime: String,
  totalTime: String,

  applicationUsage: [
    {
      appName: String,
      usageInSeconds: Number,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("ShiftUsage", ShiftUsageSchema);
