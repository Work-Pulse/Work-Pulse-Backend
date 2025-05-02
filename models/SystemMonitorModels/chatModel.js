// models/SystemMonitorModels/chatModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  senderType: {
    type: String,
    enum: ['employee', 'manager'],
    required: true
  },
  senderId: {
    type: String,
    required: true
  },
  receiverId: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  // simple attachment metadata; adapt if you want full uploads
  attachment: {
    name: String,
    size: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  // so each party can “delete” their own messages
  deletedByEmployee: {
    type: Boolean,
    default: false
  },
  deletedByManager: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Chat', ChatSchema);
