const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LeaveSchema = new Schema({
  firstName: { type: String, required: true },
  officeMail: { type: String, required: true },
  leaveType: { 
    type: String, 
    required: true,
    enum: ["Annual", "Sick", "Half Day", "Other"], // Example leave types
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  leaveTime: { type: String }, // Only relevant for Half Day leaves
  status: { 
    type: String, 
    enum: ["Pending", "Approved", "Declined"], 
    default: "Pending" 
  }
});

const LeaveRequest = mongoose.model("LeaveRequest", LeaveSchema);

module.exports = LeaveRequest;