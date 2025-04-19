const leaveModel = require("../../models/LeaveApprovalModels/leaveModel");

//routing
const fetchLeaves = async (req, res) => {
  const leaves = await leaveModel.find();

  res.json({ leaves: leaves });
};

const fetchLeave = async (req, res) => {
  const leaveId = req.params.id;

  const leave = await leaveModel.findById(leaveId);

  res.json({ leave: leave });
};

//create
const createLeave = async (req, res) => {
//   const title = req.body.title;
//   const body = req.body.body;

const{
    leaveType,
    startDate,
    endDate,
    reason
} = req.body;

  const leave = await leaveModel.create({
    // title: title,
    // body: body
    leaveType: leaveType,
    startDate: startDate,
    endDate: endDate,
    reason: reason
  });

 
  res.json({leave:leave})
};

//update
const updateLeave = async (req, res) => {
  const leaveId = req.params.id;

//   const title = req.body.title;
//   const body = req.body.body;

const{
    leaveType,
    startDate,
    endDate,
    reason
} = req.body;

  await leaveModel.findByIdAndUpdate(leaveId, {
    leaveType: leaveType,
    startDate: startDate,
    endDate: endDate,
    reason: reason
  });

  const leave = await leaveModel.findById(leaveId);

  res.json({ leave: leave });
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
