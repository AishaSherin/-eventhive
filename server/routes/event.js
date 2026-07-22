const router = require("express").Router();

const {
  getEvents,
  getMyEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

router.get("/", getEvents);

router.get("/my-events", auth, getMyEvents);

router.get("/:id", getEvent);

router.post(
  "/",
  auth,
  upload.single("bannerImage"),
  createEvent
);

router.put("/:id", auth, updateEvent);

router.delete("/:id", auth, deleteEvent);

module.exports = router;