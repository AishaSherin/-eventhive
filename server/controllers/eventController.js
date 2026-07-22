const Event = require('../models/Event');

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

exports.getEvents = async (req, res) => {
  try {
    const filter = {};

    if (req.query.search) {
      const safe = escapeRegex(req.query.search);
      filter.$or = [
        { title: { $regex: safe, $options: 'i' } },
        { description: { $regex: safe, $options: 'i' } },
        { location: { $regex: safe, $options: 'i' } },
      ];
    }

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.dateFrom) {
      filter.date = { ...filter.date, $gte: new Date(req.query.dateFrom) };
    }

    if (req.query.dateTo) {
      filter.date = { ...filter.date, $lte: new Date(req.query.dateTo) };
    }

    if (req.query.free === 'true') {
      filter.price = 0;
    }

    const events = await Event.find(filter);

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch events",
    });
  }
};

exports.getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ organiser: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch your events",
    });
  }
};

exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found. It may have been deleted.",
      });
    }

    res.status(200).json(event);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Event not found." });
    }
    res.status(500).json({
      message: "Failed to fetch event details",
    });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      date,
      location,
      capacity,
      price,
    } = req.body;

    const event = await Event.create({
      title,
      description,
      category,
      date,
      location,
      capacity,
      price,
      organiser: req.user.id,
      bannerImage: req.file
        ? `/uploads/${req.file.filename}`
        : "",
    });

    res.status(201).json(event);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const fields = Object.keys(error.errors).map(f => error.errors[f].message);
      return res.status(400).json({ message: fields.join('. ') });
    }
    res.status(500).json({
      message: "Failed to create event",
    });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found. It may have been deleted." });
    }

    if (event.organiser.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only edit your own events" });
    }

    const { title, description, category, date, location, capacity, price } = req.body;

    if (title !== undefined) event.title = title;
    if (description !== undefined) event.description = description;
    if (category !== undefined) event.category = category;
    if (date !== undefined) event.date = date;
    if (location !== undefined) event.location = location;
    if (capacity !== undefined) event.capacity = capacity;
    if (price !== undefined) event.price = price;
    if (req.file) event.bannerImage = `/uploads/${req.file.filename}`;

    await event.save();

    res.status(200).json(event);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const fields = Object.keys(error.errors).map(f => error.errors[f].message);
      return res.status(400).json({ message: fields.join('. ') });
    }
    res.status(500).json({ message: "Failed to update event" });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found. It may have already been deleted." });
    }

    if (event.organiser.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own events" });
    }

    await event.deleteOne();

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete event" });
  }
};
