const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/LeaveApproval/leaveController");
const verifyToken = require('./../middlewares/authMiddleware');

router.post("/leaves", verifyToken, leaveController.createLeave); // create
router.get("/leave/data/:officemail", leaveController.fetchLeave); // retrieve
router.put("/leave/update/:id", leaveController.updateLeave); // update
router.delete("/leave/delete/:id", leaveController.deleteLeave); // delete
router.get("/leaves", leaveController.fetchLeaves); // retrieve all

router.patch("/leaves/:id/approve", leaveController.approveLeave); // Approve leave
router.patch("/leaves/:id/reject", leaveController.rejectLeave); // Reject leave

module.exports = router;