import {
  AnonAadhaarProof,
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  useProver,
} from "@anon-aadhaar/react";
import { useEffect, useState } from "react";  // Add useState
import { useNavigate } from "react-router-dom";  // For redirect
import axios from "axios";
import { keccak256, toUtf8Bytes } from "ethers/lib/utils";  // If not installed, npm install ethers

export default function AnonAadhaar() {
  const [anonAadhaar] = useAnonAadhaar();
  const [, latestProof] = useProver();
  const navigate = useNavigate();  // For navigation

  const [nullifierHash, setNullifierHash] = useState("");  // To compute hash

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (anonAadhaar.status === "logged-in" && latestProof) {
      console.log("User logged in:", anonAadhaar);

      // Compute nullifierHash
      let hash = "";
      try {
        hash = latestProof.proof.nullifier
          ? keccak256(toUtf8Bytes(String(latestProof.proof.nullifier)))
          : "";
      } catch (e) {
        console.warn("Failed to compute nullifierHash:", e);
      }
      setNullifierHash(hash);

      // Extract profile from proof (claim)
      const { claim = {} } = latestProof;
      const initialProfile = {
        state: claim.state || "",
        pincode: claim.pincode || "",
        ageAbove18: claim.ageAbove18 || false,
        gender: claim.gender || "",
      };

      // Send to backend for login/session
      axios
        .post("http://localhost:5000/api/auth/login-anon", {
          nullifierHash: hash,
          profile: initialProfile,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role", res.data.user.role);
          localStorage.setItem("profile", JSON.stringify(res.data.user.profile));
          navigate("/profile-setup");  // Redirect to profile setup
        })
        .catch((err) => console.error("Login failed:", err));
    }
  }, [anonAadhaar.status, latestProof, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center px-4">
      <main className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-6">
        <h1 className="font-extrabold text-2xl text-gray-900 text-center">
          🔐 Welcome to Anon Aadhaar
        </h1>
        <p className="text-gray-600 text-center">
          Prove your identity <span className="font-semibold">anonymously</span> using Aadhaar —
          secure, simple, private.
        </p>

        <LogInWithAnonAadhaar
          fieldsToReveal={[
            "revealGender",
            "revealAgeAbove18",
            "revealState",
            "revealPinCode",
          ]}
          nullifierSeed={1234}
        />

        {profile?.aadhaarVerified && (
          <div className="w-full bg-green-50 border border-green-200 rounded-xl p-4 mt-4">
            <p className="text-green-700 font-semibold text-center">✅ Aadhaar Verified</p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Pincode</label>
                <input
                  type="text"
                  disabled
                  value={profile.pincode}
                  className="w-full border rounded-md p-2 bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">State</label>
                <input
                  type="text"
                  disabled
                  value={profile.state}
                  className="w-full border rounded-md p-2 bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Age</label>
                <input
                  type="text"
                  disabled
                  value={profile.ageAbove18 ? "18+" : "Under 18"}
                  className="w-full border rounded-md p-2 bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">College Year</label>
                <input
                  type="text"
                  value={profile.collegeYear}
                  onChange={(e) => setProfile({ ...profile, collegeYear: e.target.value })}
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Class</label>
                <input
                  type="text"
                  value={profile.class}
                  onChange={(e) => setProfile({ ...profile, class: e.target.value })}
                  className="w-full border rounded-md p-2"
                />
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-3 break-words">
              <span className="font-semibold">Nullifier Hash:</span>{" "}
              {profile.nullifierHash || "—"}
            </p>
          </div>
        )}

        {latestProof && (
          <div className="mt-4 text-left w-full">
            <p className="text-xs text-gray-500 mb-1">Raw Proof (debug):</p>
            <div className="bg-gray-100 p-3 rounded-lg overflow-x-auto text-xs font-mono text-gray-800 max-h-48">
              <AnonAadhaarProof code={JSON.stringify(latestProof, null, 2)} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}