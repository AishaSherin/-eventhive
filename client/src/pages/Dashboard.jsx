import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const res = await api.get("/events/my-events");
        setEvents(res.data);
      } catch {
        toast.error("Failed to load your events");
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await api.delete(`/events/${id}`);
      setEvents((prev) => prev.filter((e) => e._id !== id));
      toast.success("Event deleted");
    } catch {
      toast.error("Failed to delete event");
    }
  };

  if (loading) return <p>Loading your events...</p>;

  return (
    <div style={{ padding: "var(--space-lg)" }}>
      <h1>My Events</h1>

      {events.length === 0 ? (
        <p>
          You haven't created any events yet.{" "}
          <Link to="/create-event">Create one</Link>
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "var(--space-lg)",
          }}
        >
          {events.map((event) => (
            <div key={event._id} style={{ position: "relative" }}>
              <Link
                to={`/events/${event._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="event-card">
                  <img
                    src={
                      event.bannerImage ||
                      "https://via.placeholder.com/400x200?text=No+Image"
                    }
                    alt={event.title}
                    className="event-image"
                  />
                  <span className="category-badge">
                    {event.category || "General"}
                  </span>
                  <h2>{event.title}</h2>
                  <p>
                    {new Date(event.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p>{event.location}</p>
                  <h3>
                    {event.price === 0 || event.price === undefined
                      ? "Free"
                      : `₹${event.price}`}
                  </h3>
                </div>
              </Link>
              <button
                onClick={() => handleDelete(event._id)}
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  background: "#e53e3e",
                  color: "white",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  padding: "4px 10px",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
