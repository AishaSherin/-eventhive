import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("eventhive_token");
  const storedUser = localStorage.getItem("eventhive_user");
  const userName = storedUser ? JSON.parse(storedUser).name : null;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="logo">
        <Link to="/">EventHive</Link>
      </div>

      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="nav-links"
      >
        ☰
      </button>

      <div
        id="nav-links"
        className={`nav-links ${menuOpen ? "show" : ""}`}
      >
        <div className="center-links">
          <Link to="/">Home</Link>
          <Link to="/">Events</Link>
        </div>

        <div className="right-links">
          {!token ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <Link to="/my-tickets">My Tickets</Link>
              <Link to="/dashboard">Dashboard</Link>
              <span aria-label={`Logged in as ${userName}`}>{userName || "User"}</span>
              <button className="logout-btn" onClick={handleLogout} aria-label="Log out of your account">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
