// src/App.jsx
import { useEffect , useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate , useLocation} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// 🔹 Privy Auth
import { usePrivy, useWallets } from '@privy-io/react-auth'

// 🔹 Your components
import Header from './components/Header'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Docs from './pages/Docs'
import ProfileSetup from './pages/ProfileSetup'
import DeptLogin from './pages/DepLogin'
import PeopleDashboard from './pages/PeopleDashboard'
import PoliceDashboard from './pages/PolicDashboard'

// 🔹 Friend’s components
import Login from './components/Login'
import AnonAadhaar from './pages/AnonAadhaar'
import MerkleTreeComponent from './components/MerkleTreeComponent'

import './index.css'

// 🔹 Guarded Route (Wallet + Auth required)
function RequireWalletAndAuth() {
  const { ready, authenticated } = usePrivy()
  const { wallets } = useWallets()
  const navigate = useNavigate()
  const location = useLocation()

  // ✅ Prevent multiple navigations
  const hasNavigated = useRef(false)

  useEffect(() => {
    if (!ready) return

    // If not authenticated → redirect to login once
    if (!authenticated) {
      if (location.pathname !== '/login' && !hasNavigated.current) {
        hasNavigated.current = true
        navigate('/login', { replace: true })
      }
      return
    }

    // If authenticated but no wallet → just show loading, do nothing
    if (!wallets || wallets.length === 0) return

    // If authenticated and wallet exists → redirect to anon-aadhaar once
    if (location.pathname !== '/anon-aadhaar' && !hasNavigated.current) {
      hasNavigated.current = true
      navigate('/anon-aadhaar', { replace: true })
    }
  }, [ready, authenticated, wallets, navigate, location.pathname])

  return <div>Loading…</div>
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-deepNavy text-white">
        {/* 🔹 Common Header (only for your site pages) */}
        <Header />

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <Routes>
            {/* Your routes */}
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/profile-setup" element={<ProfileSetup />} />
            <Route path="/dep-login" element={<DeptLogin />} />
            <Route path="/people-dashboard" element={<PeopleDashboard />} />
            <Route path="/police-dashboard" element={<PoliceDashboard />} />

            {/* Friend’s routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/anon-aadhaar" element={<AnonAadhaar />} />
            <Route path="/merkletree" element={<MerkleTreeComponent />} />

            {/* Guarded route: If someone enters just "/", check auth */}
            <Route path="/guard" element={<RequireWalletAndAuth />} />
          </Routes>
        </div>

        {/* 🔹 Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: '#0F172A', color: '#F1F5F9' },
          }}
        />
      </div>
    </Router>
  )
}

export default App
