import { Link } from "react-router-dom";

function EventCard({ event }) {
  const formattedDate = new Date(event.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link
      to={`/events/${event._id}`}
      style={{ textDecoration: "none", color: "inherit" }}
      aria-label={`${event.title} — ${formattedDate} at ${event.location}`}
    >
      <div className="event-card">
        <img
          src={
            event.bannerImage ||
            "https://via.placeholder.com/400x200?text=No+Image"
          }
          alt={`Banner for ${event.title}`}
          className="event-image"
        />

        <span className="category-badge">
          {event.category || "General"}
        </span>

        <h2>{event.title}</h2>

        <p>
          {formattedDate}
        </p>

        <p>{event.location}</p>

        <h3>
          {event.price === 0 || event.price === undefined
            ? "Free"
            : `₹${event.price}`}
        </h3>
      </div>
    </Link>
  );
}

export default EventCard;
