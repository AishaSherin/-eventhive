const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");
const Event = require("./models/Event");

const MONGO_URI = process.env.MONGO_URI;

const organizer = {
  name: "Demo Organizer",
  email: "organizer@eventhive.com",
  password: "Password123",
  role: "organizer",
};

const events = [
  {
    title: "React Advanced Workshop",
    description:
      "Deep dive into React 19 features, Server Components, and performance patterns. Hands-on coding with expert instructors.",
    category: "Workshop",
    date: new Date("2026-08-15T09:00:00"),
    location: "Tech Hub, San Francisco, CA",
    capacity: 40,
    price: 75,
  },
  {
    title: "Jazz in the Park",
    description:
      "Free outdoor jazz concert featuring local artists. Bring a blanket and enjoy live music under the stars.",
    category: "Music",
    date: new Date("2026-08-22T18:30:00"),
    location: "Central Park Amphitheater, New York, NY",
    capacity: 500,
    price: 0,
  },
  {
    title: "Startup Pitch Night",
    description:
      "Watch 10 early-stage startups pitch to a panel of VCs. Networking session and refreshments included.",
    category: "Business",
    date: new Date("2026-09-05T19:00:00"),
    location: "Innovation Center, Austin, TX",
    capacity: 150,
    price: 25,
  },
  {
    title: "Community Food Drive",
    description:
      "Annual food drive supporting local shelters. Volunteers needed for sorting and distribution.",
    category: "Community",
    date: new Date("2026-07-10T10:00:00"),
    location: "City Hall, Portland, OR",
    capacity: 200,
    price: 0,
  },
  {
    title: "AI & Ethics Symposium",
    description:
      "Leading researchers discuss the ethical implications of generative AI in healthcare, education, and law.",
    category: "Conference",
    date: new Date("2026-09-20T09:00:00"),
    location: "University Auditorium, Boston, MA",
    capacity: 300,
    price: 120,
  },
  {
    title: "Summer Yoga Retreat",
    description:
      "Weekend yoga retreat with meditation sessions, healthy meals, and guided nature walks.",
    category: "Wellness",
    date: new Date("2026-07-25T07:00:00"),
    location: "Mountain View Resort, Denver, CO",
    capacity: 30,
    price: 199,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const existingUser = await User.findOne({ email: organizer.email });
    let userId;

    if (existingUser) {
      userId = existingUser._id;
      console.log("Using existing organizer:", organizer.email);
    } else {
      const hashedPassword = await bcrypt.hash(organizer.password, 10);
      const user = await User.create({
        ...organizer,
        password: hashedPassword,
      });
      userId = user._id;
      console.log("Created organizer:", organizer.email);
    }

    await Event.deleteMany({});
    console.log("Cleared old events");

    const created = await Event.insertMany(
      events.map((e) => ({ ...e, organiser: userId }))
    );

    console.log(`Created ${created.length} events:`);
    created.forEach((e) =>
      console.log(
        `  - ${e.title} | ${e.category} | ${e.date.toISOString().split("T")[0]} | ${e.price === 0 ? "Free" : "$" + e.price}`
      )
    );

    console.log("\nLogin credentials:");
    console.log(`  Email:    ${organizer.email}`);
    console.log(`  Password: ${organizer.password}`);
  } catch (err) {
    console.error("Seed failed:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

seed();
