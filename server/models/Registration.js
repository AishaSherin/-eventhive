const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  attendee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ticketId: {
    type: String,
    unique: true,
    required: true,
  },
  qrCodeData: {
    type: String,
  },
  status: {
    type: String,
    enum: ["confirmed", "cancelled"],
    default: "confirmed",
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent duplicate registrations for the same event
registrationSchema.index(
  { event: 1, attendee: 1 },
  { unique: true }
);

module.exports = mongoose.model("Registration", registrationSchema);