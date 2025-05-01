const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/LeaveApproval/leaveController");

router.post("/leaves", leaveController.createLeave); // create
router.get("/leave/data/:officemail", leaveController.fetchLeave); // retrieve
router.put("/leave/update/:officemail", leaveController.updateLeave); // update
router.delete("/leaves/:id", leaveController.deleteLeave); // delete
router.get("/leaves", leaveController.fetchLeaves); // retrieve all

router.patch("/leaves/:id/approve", leaveController.approveLeave); // Approve leave
router.patch("/leaves/:id/reject", leaveController.rejectLeave); // Reject leave

module.exports = router;