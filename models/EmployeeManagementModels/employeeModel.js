const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    id: Number,
    firstName: String,
    lastName: String,
    officeMail: String,
    personalMail: String,
    officePhone: Number,
    personalPhone: Number,
    joinDate: Date,
    birthday: Date,
    address: String,
    username: String,
    password: String,
    confirmPassword: String,
});

const employeeregister = mongoose.model('employeeregister', EmployeeSchema);

module.exports = employeeregister;