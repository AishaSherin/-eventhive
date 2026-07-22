const express = require("express");
const router = express.Router();

const {
  registerForEvent,
  getMyTickets,
  cancelRegistration,
} = require("../controllers/registrationController");

const auth = require("../middleware/auth");

router.post("/:id/register", auth, registerForEvent);
router.get("/my-tickets", auth, getMyTickets);
router.put("/:id/cancel", auth, cancelRegistration);

module.exports = router;