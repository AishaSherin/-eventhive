import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";

function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    const token = localStorage.getItem("eventhive_token");
    if (!token) {
      toast.error("Please log in to register for events");
      return navigate("/login");
    }

    try {
      const res = await api.post(`/registrations/${id}/register`);

      toast.success(`Registered! Ticket ID: ${res.data.ticketId}`);
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed. Please try again.";

      if (err.response?.status === 401) {
        toast.error("Please log in to register");
        navigate("/login");
      } else {
        toast.error(msg);
      }
    }
  };

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
    <main style={{ padding: "20px" }}>
      <h1>{event.title}</h1>

      <img
        src={
          event.bannerImage ||
          "https://via.placeholder.com/600x300?text=No+Image"
        }
        alt={`Banner for ${event.title}`}
        width="600"
      />

      <p>
        <strong>Description:</strong> {event.description}
      </p>

      <p>
        <strong>Category:</strong> {event.category}
      </p>

      <p>
        <strong>Date:</strong>{" "}
        {new Date(event.date).toLocaleDateString()}
      </p>

      <p>
        <strong>Location:</strong> {event.location}
      </p>

      <p>
        <strong>Price:</strong>{" "}
        {event.price === 0 ? "Free" : `₹${event.price}`}
      </p>

      <p>
        <strong>Capacity:</strong> {event.capacity}
      </p>

      <button
        className="btn"
        onClick={handleRegister}
        aria-label={`Register for ${event.title}`}
      >
        Register for this Event
      </button>
    </main>
  );
}

export default EventDetail;
