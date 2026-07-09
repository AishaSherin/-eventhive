const Ticket = require('../models/Ticket');

exports.registerForEvent = async (req, res) => {
  res.json({ msg: 'Register for event' });
};

exports.getMyTickets = async (req, res) => {
  res.json({ msg: 'Get my tickets' });
};
