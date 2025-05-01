const leaveModel = require("../../models/LeaveApprovalModels/leaveModel");

//routing
const fetchLeaves = async (req, res) => {
  const leaves = await leaveModel.find();

  res.json({ leaves: leaves });
};

//fetch leave details by officemail
const fetchLeave = async (req, res) => {
  const { officemail } = req.params;
  try {
    const leaves = await leaveModel.find({ officeMail: officemail });
    if (!leaves || leaves.length === 0) {
      return res.status(404).json({ error: "No leave records found" });
    }

    res.json(leaves);
  } catch (error) {
    console.error("Error fetching leave details:", error);
    res.status(500).json({ error: "Failed to fetch leave details" });
  }
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
