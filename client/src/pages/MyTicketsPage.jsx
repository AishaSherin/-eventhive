import { useEffect, useState } from "react";
import api from "../utils/api";

function MyTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await api.get("/registrations/my-tickets");
        setTickets(res.data);
      } catch {
        setTickets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p>Loading your tickets...</p>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <main style={{ padding: "40px", textAlign: "center" }}>
        <h2>No Tickets Yet</h2>
        <p>You haven't registered for any events.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "40px", maxWidth: 900, margin: "0 auto" }}>
      <h1>My Tickets</h1>

      {tickets.map((ticket) => {
        const ev = ticket.event;
        const formattedDate = new Date(ev.date).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        return (
          <article key={ticket._id} className="ticket-card">
            <img
              src={ev.bannerImage || "https://via.placeholder.com/600x300?text=No+Image"}
              alt={`Banner for ${ev.title}`}
              style={{ width: "100%", height: 200, objectFit: "cover" }}
            />

            <div style={{ padding: 20 }}>
              <h2 style={{ marginBottom: 8 }}>{ev.title}</h2>
              <p style={{ marginBottom: 4 }}>{formattedDate}</p>
              <p style={{ marginBottom: 4 }}>{ev.location}</p>

              <p style={{ marginTop: 12, marginBottom: 4 }}>
                <strong>Ticket ID:</strong>{" "}
                <span style={{ fontFamily: "'Courier New', monospace" }}>
                  {ticket.ticketId}
                </span>
              </p>

              {ticket.qrCodeData && (
                <img
                  src={ticket.qrCodeData}
                  alt={`QR code for ${ev.title} ticket`}
                  style={{ width: 120, marginTop: 12 }}
                />
              )}

              <div style={{ marginTop: 16 }}>
                <button
                  className="btn ticket-print-btn"
                  aria-label={`Print ticket for ${ev.title}`}
                  onClick={(e) => {
                    const card = e.target.closest(".ticket-card");
                    card.classList.add("printing");
                    window.print();
                    card.classList.remove("printing");
                  }}
                >
                  Print Ticket
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </main>
  );
}

export default MyTicketsPage;
