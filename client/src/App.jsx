import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateEvent from './pages/CreateEvent';
import EventDetail from './pages/EventDetail';
import Dashboard from './pages/Dashboard';
import MyTickets from './pages/MyTickets';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events/new" element={<CreateEvent />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-tickets" element={<MyTickets />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
