const Event = require("../models/Event");
const Registration = require("../models/Registration");
const { v4: uuidv4 } = require("uuid");
const QRCode = require("qrcode");
const sendEmail = require("../utils/sendEmail");
const { ticketConfirmationHTML } = require("../utils/emailTemplates");

const registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found. It may have been deleted." });
    }

    if (event.date <= new Date()) {
      return res
        .status(400)
        .json({ message: "This event has already passed. Registration is closed." });
    }

    if (event.registeredCount >= event.capacity) {
      return res.status(400).json({
        message: `This event is full (${event.capacity}/${event.capacity} spots taken).`,
      });
    }

    const existingRegistration = await Registration.findOne({
      event: event._id,
      attendee: req.user.id,
    });

    if (existingRegistration) {
      if (existingRegistration.status === "cancelled") {
        return res.status(409).json({
          message: "You previously cancelled this registration. Please re-register from the event page.",
        });
      }
      return res.status(409).json({
        message: "You are already registered for this event.",
      });
    }

    const ticketId = uuidv4();
    const qrCodeData = await QRCode.toDataURL(ticketId);

    const registration = await Registration.create({
      event: event._id,
      attendee: req.user.id,
      ticketId,
      qrCodeData,
    });

    event.registeredCount += 1;
    await event.save();

    const populated = await registration.populate("attendee", "name email");

    try {
      const html = ticketConfirmationHTML(
        populated.attendee.name,
        event.title,
        event.date,
        event.location,
        populated.ticketId,
        populated.qrCodeData.replace(/^data:image\/png;base64,/, "")
      );

      await sendEmail(populated.attendee.email, `Ticket Confirmed – ${event.title}`, html);
    } catch (emailError) {
      console.error("Confirmation email failed:", emailError.message);
    }

    res.status(201).json(registration);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const fields = Object.keys(error.errors).map(f => error.errors[f].message);
      return res.status(400).json({ message: fields.join('. ') });
    }
    res.status(500).json({
      message: "Registration failed. Please try again.",
    });
  }
};

const getMyTickets = async (req, res) => {
  try {
    const registrations = await Registration.find({
      attendee: req.user.id,
    }).populate("event");

    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({
      message: "Failed to load your tickets",
    });
  }
};

const cancelRegistration = async (req, res) => {
  try {
    const registration = await Registration.findOne({
      event: req.params.id,
      attendee: req.user.id,
    });

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found. You may not be registered for this event.",
      });
    }

    if (registration.status === "cancelled") {
      return res.status(400).json({
        message: "This registration is already cancelled.",
      });
    }

    registration.status = "cancelled";
    await registration.save();

    await Event.findByIdAndUpdate(req.params.id, {
      $inc: {
        registeredCount: -1,
      },
    });

    res.status(200).json({
      message: "Registration cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to cancel registration",
    });
  }
};

module.exports = {
  registerForEvent,
  getMyTickets,
  cancelRegistration,
};
