// src/components/Login.jsx
import React from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { ready, authenticated, login } = usePrivy();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (ready && authenticated) {
      // user has just logged in
      // since embeddedWallets: createOnLogin, wallet should be created
      navigate('/anon-aadhaar');
    }
  }, [ready, authenticated, navigate]);

  if (!ready) {
    return <div>Loading Privy...</div>;
  }

  if (!authenticated) {
    return (
      <div>
        <h2>Login</h2>
        <button onClick={() => login()}>Login</button>
        {/* or use your SMS login UI here */}
      </div>
    );
  }

  // if authenticated but for some reason still here, redirect
  return <div>Redirecting...</div>;
}

export default Login;
