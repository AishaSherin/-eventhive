import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">EventHive</Link>
      <Link to="/events/new">Create Event</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/my-tickets">My Tickets</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}

export default Navbar;
