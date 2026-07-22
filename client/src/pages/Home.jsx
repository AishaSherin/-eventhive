import { useEffect, useState } from "react";
import api from "../utils/api";
import EventCard from "../components/EventCard";

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        setEvents(res.data);
      } catch (err) {
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="page-enter" style={{ padding: "40px", maxWidth: 900, margin: "0 auto" }}>
        <div className="skeleton-line long" style={{ height: 32, width: "50%", marginBottom: 24 }} />
        <div style={{ display: "grid", gap: 24 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-image" />
              <div className="skeleton-line long" />
              <div className="skeleton-line medium" />
              <div className="skeleton-line short" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) return <div>{error}</div>;

  return (
    <div className="page-enter" style={{ padding: "40px", maxWidth: 900, margin: "0 auto" }}>
      <h1>Welcome to EventHive</h1>

      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}

export default Home;