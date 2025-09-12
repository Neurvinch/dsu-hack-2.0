// src/App.jsx
import React, { useEffect } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate
} from 'react-router-dom';
import MerkleTreeComponent from './components/MerkleTreeComponent';

import Login from './components/Login';
import AnonAadhaar from './pages/AnonAadhaar';

 // optional

function RequireWalletAndAuth({ children }) {
  const { ready, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const navigate = useNavigate();

  useEffect(() => {
    if (!ready) return;  // wait till ready

    if (!authenticated) {
      // not logged in → redirect to login
      navigate('/login');
      return;
    }
    // If logged in, but no wallet yet, maybe wait or force wallet creation
    // But since we set createOnLogin, wallet should be created on login automatically

    // Check if wallets exist
    if (!wallets || wallets.length === 0) {
      // still no wallet address → maybe show a loading or something
      // or you can show "create wallet" button or forced wallet connection
      return;
    }

    // If authenticated and wallet exists, redirect to Anon Aadhaar
    navigate('/anon-aadhaar');
  }, [ready, authenticated, wallets, navigate]);

  // Can render spinner or nothing while determining state
  return <div>Loading...</div>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route
          path="/anon-aadhaar"
          element={<AnonAadhaar />}
        />
      <Route path="/merkletree" element={<MerkleTreeComponent />} />
        <Route
          path="/"
          element={<RequireWalletAndAuth />}  // guard for initial route
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
