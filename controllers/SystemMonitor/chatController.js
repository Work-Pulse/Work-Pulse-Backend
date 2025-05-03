// controllers/SystemMonitorModels/chatController.js
const Chat = require('../../models/SystemMonitorModels/chatModel');
const Employee = require('../../models/EmployeeManagementModels/employeeModel');

// EMPLOYEE: send a message
async function sendEmployeeMessage(req, res) {
  const officeMail = req.user.email;
  const { text, attachment } = req.body;
  try {
    const msg = await Chat.create({
      senderType: 'employee',
      senderId: officeMail,
      receiverId: 'manager',
      text,
      attachment
    });
    res.status(201).json(msg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send message' });
  }
}

// EMPLOYEE: fetch two‐way chat
async function getEmployeeMessages(req, res) {
  const officeMail = req.user.email;
  try {
    const msgs = await Chat.find({
      $or: [
        { senderId: officeMail },
        { receiverId: officeMail }
      ]
    })
    .sort({ timestamp: 1 });
    return res.json(msgs);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch messages' });
  }
}

// — EMPLOYEE deletes their own message for good —
async function deleteByEmployee(req, res) {
  const { id } = req.params;
  try {
    const deleted = await Chat.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Message not found' });
    }
    return res.json({ message: 'Message permanently deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to delete message' });
  }
}

// — MANAGER SIDE —

// list all employees (so the manager menu can show everyone)
async function getEmployeeListForManager(req, res) {
  try {
    const emps = await Employee.find({}, 'firstName lastName officeMail').lean();
    return res.json(emps);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch employees' });
  }
}

// MANAGER: fetch two‐way chat with a specific employee
async function getManagerMessages(req, res) {
  const { officeMail } = req.params;
  try {
    const msgs = await Chat.find({
      $or: [
        { senderId: officeMail },
        { receiverId: officeMail }
      ]
    })
    .sort({ timestamp: 1 });
    return res.json(msgs);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch messages' });
  }
}

// manager sends a message to a specific employee
async function sendManagerMessage(req, res) {
  const { text, attachment, receiverId } = req.body;
  if (!receiverId) return res.status(400).json({ error: 'receiverId required' });
  try {
    const msg = await Chat.create({
      senderType: 'manager',
      senderId: 'manager',
      receiverId,
      text,
      attachment
    });
    return res.status(201).json(msg);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}

// — MANAGER deletes their own 
async function deleteByManager(req, res) {
  const { id } = req.params;
  try {
    const deleted = await Chat.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Message not found' });
    }
    return res.json({ message: 'Message permanently deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to delete message' });
  }
}

module.exports = {
  sendEmployeeMessage,
  getEmployeeMessages,
  deleteByEmployee,
  getEmployeeListForManager,
  getManagerMessages,
  sendManagerMessage,
  deleteByManager
};
