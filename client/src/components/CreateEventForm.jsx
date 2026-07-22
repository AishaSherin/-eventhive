import { useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

function CreateEventForm({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState(0);
  const [bannerImage, setBannerImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("date", date);
    formData.append("location", location);
    formData.append("capacity", capacity);
    formData.append("price", price);

    if (bannerImage) {
      formData.append("bannerImage", bannerImage);
    }

    try {
      setLoading(true);

      await api.post("/events", formData);

      toast.success("Event Created Successfully!");

      if (onSuccess) {
        onSuccess();
      }

      // Clear the form
      setTitle("");
      setDescription("");
      setCategory("");
      setDate("");
      setLocation("");
      setCapacity("");
      setPrice(0);
      setBannerImage(null);

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to create event"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <h2>Create Event</h2>

      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <br /><br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <br /><br />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select Category</option>
        <option value="Technology">Technology</option>
        <option value="Education">Education</option>
        <option value="Business">Business</option>
        <option value="Sports">Sports</option>
        <option value="Music">Music</option>
        <option value="Health">Health</option>
      </select>

      <br /><br />

      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <br /><br />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />

      <br /><br />

      <input
        type="number"
        placeholder="Capacity"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        required
      />

      <br /><br />

      <input
        type="number"
        placeholder="0 for free"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <br /><br />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setBannerImage(e.target.files[0])}
      />

      <br /><br />

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Event"}
      </button>

    </form>
  );
}

export default CreateEventForm;