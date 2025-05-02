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

// EMPLOYEE: fetch messages
async function getEmployeeMessages(req, res) {
  const officeMail = req.user.email;
  try {
    const msgs = await Chat.find({
      $or: [
        { senderId: officeMail, deletedByEmployee: false },
        { receiverId: officeMail, deletedByEmployee: false }
      ]
    }).sort({ timestamp: 1 });
    res.json(msgs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
}

// EMPLOYEE: delete own message
async function deleteByEmployee(req, res) {
  const officeMail = req.user.email;
  const { id } = req.params;
  try {
    const msg = await Chat.findById(id);
    if (!msg || msg.senderId !== officeMail) {
      return res.status(403).json({ error: 'Not allowed' });
    }
    msg.deletedByEmployee = true;
    await msg.save();
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Delete failed' });
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

// fetch a two-way conversation with one specific employee
async function getManagerMessages(req, res) {
  const { officeMail } = req.params;
  try {
    const msgs = await Chat.find({
      $or: [
        { senderId: officeMail, deletedByManager: false },
        { receiverId: officeMail, deletedByManager: false }
      ]
    }).sort({ timestamp: 1 });
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

// mark a manager-sent message “deleted” just for the manager
async function deleteByManager(req, res) {
  const { id } = req.params;
  try {
    const msg = await Chat.findById(id);
    if (!msg) return res.status(404).json({ error: 'Not found' });
    if (msg.senderType !== 'manager') {
      return res.status(403).json({ error: 'Cannot delete this message' });
    }
    msg.deletedByManager = true;
    await msg.save();
    return res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Delete failed' });
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
