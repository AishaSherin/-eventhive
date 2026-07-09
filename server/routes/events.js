const router = require('express').Router();
const { getEvents, getEvent, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const auth = require('../middleware/auth');

router.get('/', getEvents);
router.get('/:id', getEvent);
router.post('/', auth, createEvent);
router.put('/:id', auth, updateEvent);
router.delete('/:id', auth, deleteEvent);

module.exports = router;
