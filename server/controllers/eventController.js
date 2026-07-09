const Event = require('../models/Event');

exports.getEvents = async (req, res) => {
  res.json({ msg: 'Get all events' });
};

exports.getEvent = async (req, res) => {
  res.json({ msg: 'Get single event' });
};

exports.createEvent = async (req, res) => {
  res.json({ msg: 'Create event' });
};

exports.updateEvent = async (req, res) => {
  res.json({ msg: 'Update event' });
};

exports.deleteEvent = async (req, res) => {
  res.json({ msg: 'Delete event' });
};
