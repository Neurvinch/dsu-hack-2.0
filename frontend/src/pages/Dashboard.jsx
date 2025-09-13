import { useState } from 'react'

import { MessageCircle } from 'lucide-react'

// Import mock

import AIChat from '../components/AIChat';


export default function Dashboard() {
  
  const [aiOpen, setAiOpen] = useState(false);
 
 
  


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Communities</h1>
      <p className="text-slate-400 mb-6">Join or create anonymous groups for secure chats & feedback.</p>

      <div className="flex space-x-4 mb-6">
       
        
        <button onClick={() => setAiOpen(true)} className="btn-cyber flex items-center space-x-2 ml-4">
          <MessageCircle className="w-5 h-5" /> AI Helper
        </button>
        <AIChat isOpen={aiOpen} onClose={() => setAiOpen(false)} />
      </div>

      <div className="grid gap-4">
       
      </div>

      {/* Authority Link */}
      <div className="mt-8 text-center">
        
      </div>
    </div>
  )
}
// {16384}