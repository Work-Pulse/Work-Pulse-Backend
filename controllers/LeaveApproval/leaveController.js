const leaveModel = require("../../models/LeaveApprovalModels/leaveModel");

// Routing

// Fetch all leaves
const fetchLeaves = async (req, res) => {
  try {
    const leaves = await leaveModel.find();

    if (!leaves || leaves.length === 0) {
      return res.status(404).json({ error: "No leave records found" });
    }

    res.status(200).json(leaves);
  } catch (error) {
    console.error("Error fetching all leave records:", error);
    res.status(500).json({ error: "Failed to fetch leave records" });
  }
};

// Fetch leave details by office email
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

// Create leave
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
    leaveTime,
    status: 'Pending' // Adding default status
  });

  res.json({ leave });
};

// Update leave
const updateLeave = async (req, res) => {
  const { id } = req.params;
  const { leaveType, startDate, endDate, leaveTime, status } = req.body;

  try {
    const updatedLeave = await leaveModel.findByIdAndUpdate(
      id,
      { leaveType, startDate, endDate, leaveTime, status },
      { new: true }
    );

    if (!updatedLeave) {
      return res.status(404).json({ error: "Leave record not found" });
    }

    res.json({ leave: updatedLeave });
  } catch (error) {
    console.error("Error updating leave record:", error);
    res.status(500).json({ error: "Failed to update leave record" });
  }
};

// Backend: delete by leave _id
const deleteLeave = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedLeave = await leaveModel.findByIdAndDelete(id);

    if (!deletedLeave) {
      return res.status(404).json({ error: "Leave record not found" });
    }

    res.json({ message: "Leave record deleted successfully" });
  } catch (error) {
    console.error("Error deleting leave record:", error);
    res.status(500).json({ error: "Failed to delete leave record" });
  }
};



// Approve leave
const approveLeave = async (req, res) => {
  try {
    const { id } = req.params;
    
    const leave = await leaveModel.findById(id);
    if (!leave) {
      return res.status(404).json({ error: "Leave request not found" });
    }
    if (leave.status !== 'Pending') {
      return res.status(400).json({ error: "Leave request is not pending" });
    }

    const updatedLeave = await leaveModel.findByIdAndUpdate(
      id,
      { status: 'Approved', approvedAt: new Date() },
      { new: true }
    );

    res.status(200).json(updatedLeave);
  } catch (error) {
    console.error("Error approving leave:", error);
    res.status(500).json({ error: "Failed to approve leave request" });
  }
};

// Reject leave
const rejectLeave = async (req, res) => {
  try {
    const { id } = req.params;
    
    const leave = await leaveModel.findById(id);
    if (!leave) {
      return res.status(404).json({ error: "Leave request not found" });
    }
    if (leave.status !== 'Pending') {
      return res.status(400).json({ error: "Leave request is not pending" });
    }

    const updatedLeave = await leaveModel.findByIdAndUpdate(
      id,
      { status: 'Declined', rejectedAt: new Date() },
      { new: true }
    );

    res.status(200).json(updatedLeave);
  } catch (error) {
    console.error("Error rejecting leave:", error);
    res.status(500).json({ error: "Failed to reject leave request" });
  }
};

module.exports = {
  fetchLeaves,
  fetchLeave,
  createLeave,
  updateLeave,
  deleteLeave,
  approveLeave,
  rejectLeave
};