const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LeaveSchema = new Schema({
    
    leaveType: String,
    startDate: Date,
    endDate: Date,
    reason: String,
});

const leaverequest = mongoose.model("leaverequest", LeaveSchema);

module.exports = leaverequest;
