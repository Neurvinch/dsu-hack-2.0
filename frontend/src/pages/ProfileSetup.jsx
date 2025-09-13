import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProfileSetup() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    state: "",
    pincode: "",
    ageAbove18: false,
    gender: "",
    collegeYear: "",
    class: "",
  });

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("profile"));
    if (storedProfile) {
      setProfile(storedProfile);
    } else {
      // Optionally fetch from backend if not in local
      const token = localStorage.getItem("token");
      axios.get("http://localhost:5000/api/auth/profile", {  // Add this endpoint if needed
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => setProfile(res.data.profile));
    }
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .put("http://localhost:5000/api/auth/profile", profile, {  // Add PUT endpoint in auth.js for updating profile
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        localStorage.setItem("profile", JSON.stringify(profile));
        navigate("/people-dashboard");
      })
      .catch((err) => console.error("Update failed:", err));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center px-4">
      <main className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <h1 className="font-extrabold text-2xl text-gray-900 text-center mb-6">
          Set Up Your Profile
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">State (from Aadhaar)</label>
            <input
              type="text"
              value={profile.state}
              disabled
              className="w-full border rounded-md p-2 bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Pincode (from Aadhaar)</label>
            <input
              type="text"
              value={profile.pincode}
              disabled
              className="w-full border rounded-md p-2 bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Age (from Aadhaar)</label>
            <input
              type="text"
              value={profile.ageAbove18 ? "18+" : "Under 18"}
              disabled
              className="w-full border rounded-md p-2 bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Gender (from Aadhaar)</label>
            <input
              type="text"
              value={profile.gender}
              disabled
              className="w-full border rounded-md p-2 bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">College Year</label>
            <input
              type="text"
              name="collegeYear"
              value={profile.collegeYear}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Class</label>
            <input
              type="text"
              name="class"
              value={profile.class}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
            Save Profile & Go to Dashboard
          </button>
        </form>
      </main>
    </div>
  );
}