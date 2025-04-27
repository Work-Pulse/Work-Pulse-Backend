const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LeaveSchema = new Schema({
    employeeName: { type: String, required: true },
    leaveType: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    leaveTime: { type: String }, // Keep time as string, like "14:00"
});


const leaverequest = mongoose.model("leaverequest", LeaveSchema);

module.exports = leaverequest;
