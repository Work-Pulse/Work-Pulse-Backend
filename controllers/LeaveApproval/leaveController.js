const leaveModel = require("../../models/LeaveApprovalModels/leaveModel");

//routing
const fetchLeaves = async (req, res) => {
  const leaves = await leaveModel.find();

  res.json({ leaves: leaves });
};

const fetchLeave = async (req, res) => {
  const officeMail = req.params.officemail;
  const leave = await leaveModel.find({ officeMail });
  res.json({ leave });
};


//create

const createLeave = async (req, res) => {
  const {
    firstName,
    officeMail,
    leaveType,
    startDate,
    endDate,
    leaveTime
  } = req.body;

  const leave = await leaveModel.create({
    firstName,
    officeMail,
    leaveType,
    startDate,
    endDate,
    leaveTime
  });

  res.json({ leave });
};


//update

const updateLeave = async (req, res) => {
  const leaveId = req.params.id;

  const {
    firstName,
    officeMail,
    leaveType,
    startDate,
    endDate,
    leaveTime
  } = req.body;

  await leaveModel.findByIdAndUpdate(leaveId, {
    firstName,
    officeMail,
    leaveType,
    startDate,
    endDate,
    leaveTime
  });

  const leave = await leaveModel.findById(leaveId);

  res.json({ leave });
};


//delete
const deleteLeave = async (req, res) => {
  const leaveId = req.params.id;

  await leaveModel.deleteOne({ _id: leaveId });

  res.json({ sucess: "Leave request deleted" });
};

module.exports = {
  fetchLeaves,
  fetchLeave,
  createLeave,
  updateLeave,
  deleteLeave,
};
