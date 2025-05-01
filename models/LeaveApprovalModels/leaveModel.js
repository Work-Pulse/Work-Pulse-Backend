const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LeaveSchema = new Schema({
    firstName:{ type: String },
    officeMail: { type: String },
    leaveType: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    leaveTime: { type: String },
    //status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" }, // Add status field
  });
  


const leaverequest = mongoose.model("leaverequest", LeaveSchema);

module.exports = leaverequest;
