import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PoliceDashboard() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || localStorage.getItem("role") !== "police") {
      navigate("/dept-login");
    }
    axios
      .get("http://localhost:5000/api/complaints", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setComplaints(res.data))
      .catch((err) => console.error(err));
  }, [navigate]);

  // Function to update status (add PUT endpoint if needed)
  const updateStatus = (id, newStatus) => {
    const token = localStorage.getItem("token");
    axios.put(`http://localhost:5000/api/complaints/${id}`, { status: newStatus }, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      // Refresh complaints
      setComplaints(complaints.map(c => c._id === id ? { ...c, status: newStatus } : c));
    });
  };

  return (
    <div className="min-h-screen bg-gray-400 p-8">
      <h1 className="text-3xl font-bold mb-6">Police Dashboard</h1>
      {complaints.map((complaint) => (
        <div key={complaint._id} className="bg-white p-4 rounded shadow mb-4">
          <p>{complaint.text}</p>
          <p>Classification: {complaint.classification}</p>
          <p>Status: {complaint.status}</p>
          {complaint.evidenceCID && (
            <a href={`https://ipfs.io/ipfs/${complaint.evidenceCID}`} target="_blank" rel="noopener noreferrer">
              View Evidence
            </a>
          )}
          <select onChange={(e) => updateStatus(complaint._id, e.target.value)} value={complaint.status}>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          {/* Chat section */}
          <div className="mt-4">
            <h3>Chat</h3>
            {complaint.chats.map((chat, idx) => (
              <p key={idx}>{chat.senderRole}: {chat.message}</p>
            ))}
            <form onSubmit={(e) => {
              e.preventDefault();
              const message = e.target.message.value;
              axios.post(`http://localhost:5000/api/complaints/${complaint._id}/chat`, { message }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
              }).then(() => {
                // Refresh complaint
              });
            }}>
              <input name="message" type="text" placeholder="Reply..." />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}