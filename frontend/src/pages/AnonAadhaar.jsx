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
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <main className="w-full max-w-2xl bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-6">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
          <h1 className="font-bold text-2xl text-center mb-2">
            Anonymous Aadhaar Verification
          </h1>
          <p className="text-blue-100 text-center text-sm">
            Prove your identity anonymously using Aadhaar — secure, simple, private.
          </p>
        </div>

        <div className="px-8 py-6">
          {/* How it Works Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Upload Aadhaar</h3>
                <p className="text-xs text-gray-600">Securely upload your Aadhaar PDF document</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold text-sm">2</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Generate Proof</h3>
                <p className="text-xs text-gray-600">Create zero-knowledge proof of your identity</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold text-sm">3</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Stay Anonymous</h3>
                <p className="text-xs text-gray-600">Verify without revealing personal information</p>
              </div>
            </div>

            {/* Features */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-blue-900 mb-2">What We'll Verify</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <svg className="h-4 w-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-blue-800">Gender</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-4 w-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-blue-800">Age Above 18</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-4 w-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-blue-800">State</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-4 w-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-blue-800">Pin Code</span>
                </div>
              </div>
            </div>
          </div>

          {/* Centered Login Button */}
          <div className="flex justify-center mb-6">
            <LogInWithAnonAadhaar
              fieldsToReveal={["revealGender", "revealAgeAbove18", "revealState", "revealPinCode"]}
              nullifierSeed={1234}   // ✅ stable
            />
          </div>

          {/* Success State */}
          {anonAadhaar.status === "logged-in" && (
            <div className="w-full bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-green-800 font-semibold text-lg mb-2">Verification Successful</h3>
              <p className="text-green-700 mb-4">
                Your identity has been verified anonymously. Welcome!
              </p>
              
              {latestProof && (
                <div className="mt-6 text-left">
                  <div className="bg-white border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-gray-900">Zero-Knowledge Proof</h4>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Valid</span>
                    </div>
                    <div className="bg-gray-50 border rounded-lg p-3 overflow-x-auto max-h-48">
                      <AnonAadhaarProof code={JSON.stringify(latestProof, null, 2)} />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      This cryptographic proof verifies your Aadhaar without revealing personal details.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Security Note */}
          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-start">
              <svg className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">Privacy & Security</h4>
                <p className="text-xs text-gray-600">
                  Your Aadhaar document is processed locally in your browser and never sent to our servers. 
                  Only the cryptographic proof is generated and verified.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}