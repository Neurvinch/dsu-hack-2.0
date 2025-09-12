import {
  AnonAadhaarProof,
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  useProver,
} from "@anon-aadhaar/react";
import { useEffect } from "react";

export default function anonAadhaar() {
  const [anonAadhaar] = useAnonAadhaar();
  const [, latestProof] = useProver();

  useEffect(() => {
    if (anonAadhaar.status === "logged-in") {
      console.log("User logged in:", anonAadhaar);
    }
  }, [anonAadhaar]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center px-4">
      <main className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-6">
        <h1 className="font-extrabold text-2xl text-gray-900 text-center">
          🔐 Welcome to Anon Aadhaar
        </h1>
        <p className="text-gray-600 text-center">
          Prove your identity <span className="font-semibold">anonymously</span>
          using Aadhaar — secure, simple, private.
        </p>

        <LogInWithAnonAadhaar
          fieldsToReveal={["revealGender", "revealAgeAbove18", "revealState", "revealPinCode"]}
          nullifierSeed={1234}
        />

        {anonAadhaar.status === "logged-in" && (
          <div className="w-full bg-green-50 border border-green-200 rounded-xl p-4 mt-4 text-center">
            <p className="text-green-700 font-semibold">✅ Proof is valid</p>
            <p className="text-sm text-gray-700 mt-1">
              Welcome, anonymous user!
            </p>
            {latestProof && (
              <div className="mt-3 text-left">
                <p className="text-xs text-gray-500 mb-1">
                  Your Aadhaar Proof:
                </p>
                <div className="bg-gray-100 p-3 rounded-lg overflow-x-auto text-xs font-mono text-gray-800 max-h-48">
                  <AnonAadhaarProof
                    code={JSON.stringify(latestProof, null, 2)}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
