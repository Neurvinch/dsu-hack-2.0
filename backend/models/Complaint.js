const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  department: { type: String, enum: ['police', 'it', 'other_dept'], required: true },
  text: { type: String, required: true },
  classification: { type: String, enum: ['normal', 'serious', 'immediate_action'] },
  evidenceCID: { type: String },  // IPFS CID for uploaded file
  status: { type: String, default: 'pending', enum: ['pending', 'in_progress', 'resolved'] },
  chats: [{ message: String, senderRole: String, timestamp: { type: Date, default: Date.now } }],  
  // In Complaint.js
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Internal only / Simple chat history
  // NO user reference here to keep anonymous
}, { timestamps: true });



module.exports = mongoose.model('Complaint', complaintSchema);