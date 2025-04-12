const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  id: Number,
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
  password: String, // Store only hashed password
});

const employeeModel = mongoose.model('employeeregister', EmployeeSchema);
module.exports = employeeModel;
