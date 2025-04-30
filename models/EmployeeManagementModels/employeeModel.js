const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-sequence')(mongoose);

const EmployeeSchema = new Schema({
  employeeId: Number,  // Auto-increment handled by plugin
  firstName: String,
  lastName: String,
  designation: String,
  department: String,
  officeMail: String,
  personalMail: String,
  officePhone: Number,
  personalPhone: Number,
  joinDate: Date,
  birthday: Date,
  address: String,
  password: String,
  confirmPassword: String,
}, { timestamps: true });

// Auto-increment config
EmployeeSchema.plugin(autoIncrement, {
  inc_field: 'employeeId',
  start_seq: 1,
  transform: (seq) => seq.toString().padStart(5, '0')  // Format like 00001
});

const employeeregister = mongoose.model('employeeregister', EmployeeSchema);

module.exports = employeeregister;
