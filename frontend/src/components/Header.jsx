import { useNavigate } from 'react-router-dom'
import { Shield, Lock } from 'lucide-react'


export default function Header() {


  // Add state

  const navigate = useNavigate();


  // Search handler (mock: filter groups/events)




  return (
    <nav className="bg-slate-900/80 backdrop-blur-md shadow-lg border-b border-slate-700 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-cyberGreen rounded-lg">
            <Shield className="w-6 h-6 text-deepNavy" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">AnonSecure ZK</h1>
            <p className="text-xs text-steelBlue">Zero-Knowledge Feedback System</p>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex space-x-6">
            <button onClick={() => navigate('/')} className="p-2 text-slate-300 hover:text-cyberGreen transition">Home</button>
            <button onClick={() => navigate('/about')} className="p-2 text-slate-300 hover:text-cyberGreen transition">About Project</button>
            <button onClick={() => navigate('/docs')} className="p-2 text-slate-300 hover:text-cyberGreen transition">Docs</button>
            <button onClick={() => navigate('/dashboard')} className="text-slate-300 hover:text-cyberGreen transition">Dashboard</button>

          </nav>
          <button
            onClick={() => navigate('/login')}
            className="btn-cyber flex items-center space-x-2"
          >
            <Lock className="w-4 h-4" /> LOGIN
          </button>

        </div>
      </div>
    </nav>
  )
}