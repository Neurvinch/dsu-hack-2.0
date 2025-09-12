import {usePrivy} from "@privy-io/react-auth"

import './App.css'

function App() {
  const {ready,authenticated,user,login,logout} = usePrivy()

  if (!ready) {
    return <div>Loading Privy...</div>;
  }

  if (!authenticated) {
    return (
      <button onClick={() => login()}>Login</button>
    );
  }

  return (
    <div>
      <p>Welcome, {user?.id}</p>
      <button onClick={() => logout()}>Logout</button>
    </div>
    
  )
}

export default App
