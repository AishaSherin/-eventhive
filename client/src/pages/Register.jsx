import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("attendee");
  const [error, setError] = useState("");

  const passwordMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      toast.success("Registration Successful!");

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <main>
      <h1>Register</h1>

      <form onSubmit={handleSubmit} noValidate>

        <div>
          <label htmlFor="register-name">Name</label><br />
          <input
            id="register-name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
          />
        </div>

        <br />

        <div>
          <label htmlFor="register-email">Email</label><br />
          <input
            id="register-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <br />

        <div>
          <label htmlFor="register-password">Password</label><br />
          <input
            id="register-password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>

        <br />

        <div>
          <label htmlFor="register-confirm-password">Confirm Password</label><br />
          <input
            id="register-confirm-password"
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          {passwordMismatch && (
            <p role="alert" style={{ color: "red", margin: "4px 0 0" }}>
              Passwords do not match
            </p>
          )}
        </div>

        <br />

        <fieldset>
          <legend>Role</legend>

          <label htmlFor="role-attendee">
            <input
              id="role-attendee"
              type="radio"
              name="role"
              value="attendee"
              checked={role === "attendee"}
              onChange={(e) => setRole(e.target.value)}
            />
            Attendee
          </label>

          <br />

          <label htmlFor="role-organizer">
            <input
              id="role-organizer"
              type="radio"
              name="role"
              value="organizer"
              checked={role === "organizer"}
              onChange={(e) => setRole(e.target.value)}
            />
            Organizer
          </label>
        </fieldset>

        <br />

        <button type="submit">Register</button>

        {error && (
          <p role="alert" style={{ color: "red" }}>
            {error}
          </p>
        )}

      </form>
    </main>
  );
}

export default Register;
