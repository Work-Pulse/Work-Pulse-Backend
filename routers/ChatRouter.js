// routes/chatRouter.js
const express = require('express');
const router = express.Router();

const chatController = require('../controllers/SystemMonitor/chatController');
const verifyToken = require('./../middlewares/authMiddleware');

// Employee routes (must be signed in)
router.get('/employee', verifyToken, chatController.getEmployeeMessages);
router.post('/employee/send', verifyToken, chatController.sendEmployeeMessage);
router.delete('/employee/:id', verifyToken, chatController.deleteByEmployee);

// Manager routes (no auth)
router.get( '/manager/employees', chatController.getEmployeeListForManager);
router.get( '/manager/:officeMail', chatController.getManagerMessages);
router.post('/manager/send', chatController.sendManagerMessage);
router.delete('/manager/:id', chatController.deleteByManager);

module.exports = router;
