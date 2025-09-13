import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Import your Gemini chat component if separate
// import GeminiChat from './GeminiChat';
import AIChat from '../components/AIChat';
import { MessageCircle } from 'lucide-react';

export default function PeopleDashboard() {
  const navigate = useNavigate();
  const [department, setDepartment] = useState("");
  const [text, setText] = useState("");
  const [evidence, setEvidence] = useState(null);
  const [complaints, setComplaints] = useState([]);  // User's complaints
    const [aiOpen, setAiOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || localStorage.getItem("role") !== "people") {
      navigate("/");  // Redirect if not authorized
    }
    fetchComplaints(token);
  }, [navigate]);

  const fetchComplaints = (token) => {
    axios
      .get("http://localhost:5000/api/complaints/my-complaints", {  // Add this endpoint: find complaints by user? Wait, anonymous! Maybe skip or use session to track user's complaints without storing ID.
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setComplaints(res.data))
      .catch((err) => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("department", department);
    formData.append("text", text);
    if (evidence) formData.append("evidence", evidence);

    axios
      .post("http://localhost:5000/api/complaints", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        setText("");
        setEvidence(null);
        fetchComplaints(token);
      })
      .catch((err) => console.error("Submit failed:", err));
  };

  return (
    <div className="min-h-screen bg-gray-400 p-8">
      <h1 className="text-3xl font-bold mb-6">People Dashboard</h1>
      <div className="flex space-x-4 mb-6">
       
        
        <button onClick={() => setAiOpen(true)} className="btn-cyber flex items-center space-x-2 ml-4">
          <MessageCircle className="w-5 h-5" /> AI Helper
        </button>
        <AIChat isOpen={aiOpen} onClose={() => setAiOpen(false)} />
      </div>
      {/* Gemini AI Chat Integration */}
      {/* <GeminiChat />  // Your chat component for analyzing prompts */}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8">
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full border p-2 mb-4"
          required
        >
          <option value="">Select Department</option>
          <option value="police">Police</option>
          <option value="it">IT</option>
          <option value="other_dept">Other Department</option>
        </select>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your complaint..."
          className="w-full border p-2 mb-4"
          required
        />
        <input
          type="file"
          onChange={(e) => setEvidence(e.target.files[0])}
          className="mb-4"
        />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
          Submit Complaint
        </button>
      </form>

      <h2 className="text-2xl font-semibold mb-4">Your Complaints</h2>
      {complaints.map((complaint) => (
        <div key={complaint._id} className="bg-white p-4 rounded shadow mb-4">
          <p>{complaint.text}</p>
          <p>Classification: {complaint.classification}</p>
          {complaint.evidenceCID && (
            <a href={`https://ipfs.io/ipfs/${complaint.evidenceCID}`} target="_blank" rel="noopener noreferrer">
              View Evidence
            </a>
          )}
          {/* Chat section */}
          <div className="mt-4">
            <h3>Chat</h3>
            {complaint.chats.map((chat, idx) => (
              <p key={idx}>{chat.senderRole}: {chat.message}</p>
            ))}
            <form onSubmit={(e) => { e.preventDefault(); /* Add chat submit */ }}>
              <input type="text" placeholder="Reply..." />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}