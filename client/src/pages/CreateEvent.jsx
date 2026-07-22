import { useNavigate } from "react-router-dom";
import CreateEventForm from "../components/CreateEventForm";

function CreateEvent() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "var(--space-lg)", maxWidth: 600, margin: "0 auto" }}>
      <CreateEventForm onSuccess={() => navigate("/dashboard")} />
    </div>
  );
}

export default CreateEvent;
