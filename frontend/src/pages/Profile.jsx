// Simple polling for alerts
import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { Bell } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Profile() {
  const { address } = useAccount()
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    const pollAlerts = async () => {
      const res = await fetch(`/api/alerts/${address}`)
      const data = await res.json()
      if (data.length > 0) {
        toast.warning('Identity Alert: Potential exposure detected!')
        setAlerts(data)
      }
    }
    const interval = setInterval(pollAlerts, 30000)  // Poll every 30s
    return () => clearInterval(interval)
  }, [address])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Profile & Alerts</h1>
      <p>Your submissions (hashes only): [List hashes]</p>
      {alerts.length > 0 && (
        <div className="mt-4 p-4 bg-yellow-100 rounded">
          <Bell className="w-5 h-5 inline mr-2" />
          Alerts: {alerts.map(a => a.message).join(', ')}
        </div>
      )}
    </div>
  )
}