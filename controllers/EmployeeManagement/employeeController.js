const employeeModel = require("../../models/EmployeeManagementModels/employeeModel");

//routing
const fetchEmployees = async (req, res) => {
  const employees = await employeeModel.find();

  res.json({ employees: employees });
};

const fetchEmployee = async (req, res) => {
  const employeeId = req.params.id;

  const employee = await employeeModel.findById(employeeId);

  res.json({ employee: employee });
};

//create
const createEmployee = async (req, res) => {
    const {
        firstName,
        lastName,
        officeMail,
        personalMail,
        officePhone,
        personalPhone,
        joinDate,
        birthday,
        address,
        username,
        password,
        confirmPassword
      } = req.body;
      

  const employee = await employeeModel.create({
    firstName: firstName,
    lastName: lastName,
    officeMail: officeMail,
    personalMail: personalMail,
    officePhone: officePhone,
    personalPhone: personalPhone,
    joinDate: joinDate,
    birthday: birthday,
    address: address,
    username: username,
    password: password,
    confirmPassword: confirmPassword,
  
  });

 
  res.json({employee:employee})
};

//update
const updateEmployee = async (req, res) => {
  const employeeId = req.params.id;

  const {
    firstName,
    lastName,
    officeMail,
    personalMail,
    officePhone,
    personalPhone,
    joinDate,
    birthday,
    address,
    username,
    password,
    confirmPassword
  } = req.body;
  

  await employeeModel.findByIdAndUpdate(employeeId, {
    firstName: firstName,
    lastName: lastName,
    officeMail: officeMail,
    personalMail: personalMail,
    officePhone: officePhone,
    personalPhone: personalPhone,
    joinDate: joinDate,
    birthday: birthday,
    address: address,
    username: username,
    password: password,
    confirmPassword: confirmPassword,
  });

  const employee = await employeeModel.findById(employeeId);

  res.json({ employee: employee });
};

//delete
const deleteEmployee = async (req, res) => {
  const employeeId = req.params.id;

  await employeeModel.deleteOne({ _id: employeeId });

  res.json({ sucess: "employee deleted" });
};

module.exports = {
  fetchEmployees,
  fetchEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
