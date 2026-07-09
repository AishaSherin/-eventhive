const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  attendee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  qrCode: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);
