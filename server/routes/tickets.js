const router = require('express').Router();
const { registerForEvent, getMyTickets } = require('../controllers/ticketController');
const auth = require('../middleware/auth');

router.post('/:eventId/register', auth, registerForEvent);
router.get('/mine', auth, getMyTickets);

module.exports = router;
