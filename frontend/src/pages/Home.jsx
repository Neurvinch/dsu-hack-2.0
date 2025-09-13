import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, Lock, BookOpen, Newspaper } from 'lucide-react'
import { useState } from 'react'

import Tooltip from '../components/Tooltip'

const MotionDiv = motion.div

export default function Home() {
  const navigate = useNavigate()
  const [showFlow, setShowFlow] = useState(false)  // For expanding flow section

  // Function:

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero Section - Like Grok/ChatGPT */}
      <MotionDiv
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 gradient-hero rounded-2xl p-12"
      >
        <div className="inline-flex items-center space-x-2 bg-black/30 px-4 py-2 rounded-full mb-6">
          <ShieldCheck className="w-5 h-5 text-cyberGreen" />
          <span className="text-sm font-medium">Powered by ZK Proofs & Blockchain</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">AnonSecure</h1>

        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
          People fear disclosing issues (education, workplace, society, corruption) due to retaliation.
          Our ZK-powered system enables anonymous but verifiable feedback: Prove membership without reveal, encrypt evidence on IPFS, alert if identity risks exposed.
        </p>
        <div className="space-x-4">
        
          <div className="inline-block p-4">
            <button onClick={() => navigate('/about')} className="bg-slate-800 hover:bg-slate-700 text-white px-10 py-4 rounded-md transition">
              Explore Project
            </button>
          </div>
        </div>
      </MotionDiv>

      {/* Software Flow Section - Detailed Diagram */}
      <section className="mb-16">
        <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">How It Works: Secure Feedback Flow</h2>
          <p className="text-slate-400">End-to-end anonymous and verifiable process powered by ZK proofs, IPFS, and DAO governance.</p>
          <button onClick={() => setShowFlow(!showFlow)} className="btn-cyber mt-4 px-6 py-2">
            {showFlow ? 'Hide Flow' : 'Show Detailed Flow'}
          </button>
          <div className="mt-4 text-slate-400">
            {showFlow ? (
              <p>Here is a detailed view of the secure feedback flow...</p>
            ) : (
              <p>Click the button to see the detailed flow.</p>
            )}
          </div>
        </MotionDiv>

        {showFlow && (
          <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-cyber p-8">
            {/* Simple SVG Diagram - Mirrors PPT Flow */}
            <svg viewBox="0 0 1200 300" className="w-full h-auto mb-6">
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#00D4AA', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#1E40AF', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              {/* Boxes */}
              <rect x="50" y="100" width="120" height="60" rx="10" fill="#0F172A" stroke="#00D4AA" strokeWidth="2" />
              <text x="110" y="135" textAnchor="middle" fill="white" fontSize="12">Connect Wallet</text>

              <rect x="220" y="100" width="120" height="60" rx="10" fill="#0F172A" stroke="#00D4AA" strokeWidth="2" />
              <text x="280" y="125" textAnchor="middle" fill="white" fontSize="12">Generate ZK Proof</text>
              <text x="280" y="145" textAnchor="middle" fill="white" fontSize="10">(Anonymous Eligibility)</text>

              <rect x="390" y="100" width="120" height="60" rx="10" fill="#0F172A" stroke="#00D4AA" strokeWidth="2" />
              <text x="450" y="125" textAnchor="middle" fill="white" fontSize="12">Submit Feedback</text>
              <text x="450" y="145" textAnchor="middle" fill="white" fontSize="12">& Evidence</text>

              <polygon points="510,130 540,125 510,120" fill="#00D4AA" /> {/* Verify Diamond Start */}
              <rect x="510" y="100" width="120" height="60" rx="51" fill="#1E40AF" stroke="#00D4AA" strokeWidth="2" />
              <text x="540" y="125" textAnchor="middle" fill="white" fontSize="12">Verify</text>
              <text x="540" y="145" textAnchor="middle" fill="white" fontSize="12">Proof</text>
              <polygon points="570,130 600,125 570,120" fill="#00D4AA" /> {/* Yes Arrow */}

              <rect x="650" y="100" width="100" height="60" rx="10" fill="#0F172A" stroke="#00D4AA" strokeWidth="2" />
              <text x="700" y="135" textAnchor="middle" fill="white" fontSize="12">Store Hash on IPFS</text>
              <text x="700" y="155" textAnchor="middle" fill="white" fontSize="10">(Encrypted & Tamper-Proof)</text>

              <rect x="800" y="100" width="100" height="60" rx="10" fill="#0F172A" stroke="#00D4AA" strokeWidth="2" />
              <text x="850" y="135" textAnchor="middle" fill="white" fontSize="12">View/Complete</text>

              <polygon points="900,130 930,125 900,120" fill="#00D4AA" /> {/* Escalate Diamond */}
              <rect x="900" y="100" width="60" height="60" rx="5" fill="#1E40AF" stroke="#00D4AA" strokeWidth="2" />
              <text x="930" y="135" textAnchor="middle" fill="white" fontSize="12">Escalate?</text>
              <polygon points="960,130 990,125 960,120" fill="#00D4AA" /> {/* Yes to DAO */}

              <rect x="1030" y="100" width="80" height="60" rx="10" fill="#0F172A" stroke="#00D4AA" strokeWidth="2" />
              <text x="1070" y="135" textAnchor="middle" fill="white" fontSize="12">DAO Voting</text>

              <rect x="1130" y="100" width="80" height="60" rx="10" fill="#0F172A" stroke="#00D4AA" strokeWidth="2" />
              <text x="1170" y="135" textAnchor="middle" fill="white" fontSize="12">Take Action</text>

              {/* Arrows */}
              <line x1="170" y1="130" x2="220" y2="130" stroke="#00D4AA" strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="340" y1="130" x2="390" y2="130" stroke="#00D4AA" strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="570" y1="130" x2="650" y2="130" stroke="#00D4AA" strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="750" y1="130" x2="800" y2="130" stroke="#00D4AA" strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="900" y1="130" x2="960" y2="130" stroke="#00D4AA" strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="1110" y1="130" x2="1130" y2="130" stroke="#00D4AA" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* No Arrows (Dashed) */}
              <line x1="510" y1="160" x2="390" y2="160" stroke="#EF4444" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#no-arrow)" />
              <line x1="900" y1="160" x2="800" y2="160" stroke="#EF4444" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#no-arrow)" />

              {/* Markers */}
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L9,3 z" fill="#00D4AA" />
                </marker>
                <marker id="no-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L9,3 z" fill="#EF4444" />
                </marker>
              </defs>
            </svg>
            <p className="text-slate-400 text-sm">Flow: Anonymous submission → ZK verification → Secure storage → DAO escalation if needed. Identity alerts monitor for risks.</p>
          </MotionDiv>
        )}
      </section>

      {/* How to Use Feedback Section */}
      <section className="grid md:grid-cols-2 gap-12 mb-16">
        <MotionDiv initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="card-cyber">
          <div className="flex items-center space-x-4 mb-6">
            <Lock className="w-8 h-8 text-cyberGreen" />
            <h3 className="text-2xl font-bold">For Reporters: Submit Feedback</h3>
          </div>
          <ol className="space-y-4 text-slate-800">
            <li>1. <strong>Connect Wallet</strong>: Securely link your wallet (no personal data shared).</li>
            <li>2. <strong>Generate ZK Proof</strong>: Prove eligibility anonymously (e.g., student/employee status).</li>
            <li>3. <strong>Describe & Upload</strong>: Write your issue, attach encrypted evidence (auto-stored on IPFS).</li>
            <li>4. <strong>Submit</strong>: System verifies & stores – get a hash to track. Alerts if identity at risk.</li>
          </ol>
          
        </MotionDiv>

        <MotionDiv initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card-cyber">
          <div className="flex items-center space-x-4 mb-6">
            <ShieldCheck className="w-8 h-8 text-cyberGreen" />
            <h3 className="text-2xl font-bold">For Authorities: Review & Act</h3>
          </div>
          <ol className="space-y-4 text-slate-800">
            <li>1. <strong>Connect Wallet</strong>: Access verified issues dashboard.</li>
            <li>2. <strong>View Issues</strong>: See anonymized summaries, evidence (IPFS), ZK badges – no identities.</li>
            <li>3. <strong>Escalate if Needed</strong>: Vote via DAO for action (e.g., investigate corruption).</li>
            <li>4. <strong>Take Action</strong>: Government/police handle verified reports securely.</li>
          </ol>
          
        </MotionDiv>
      </section>

      // After how-to section:
<section className="mb-16">
  <h2 className="text-3xl font-bold mb-4 text-center">Real-World Impact</h2>
  <div className="grid md:grid-cols-2 gap-6">
    <div className="card-cyber p-6">
      <h3 className="font-semibold mb-2">Feasibility</h3>
      <p className="text-slate-800">Built on Noir ZK – scalable, but watch for computation risks.</p>
      <Tooltip text="Challenges: ZK overhead, IPFS pinning (use Arweave backup)">Potential Risks</Tooltip>
    </div>
    <div className="card-cyber p-6">
      <h3 className="font-semibold mb-2">Impact Highlights</h3>
      <ul className="space-y-1 text-slate-800 text-sm">
        <li>• Honest student feedback without fear.</li>
        <li>• Employee safety & corporate transparency.</li>
        <li>• Citizens report corruption anonymously.</li>
        <li>• Police/Govt get verified issues w/o exposing identity.</li>
      </ul>
    </div>
  </div>
</section>

      {/* Resources Section: Blog & Docs */}
      <section className="mb-16">
        <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Resources</h2>
          <p className="text-slate-400">Learn more about ZK tech, security, and our project.</p>
        </MotionDiv>
        <div className="grid md:grid-cols-2 gap-6">
          <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-cyber text-center">
            <BookOpen className="w-12 h-12 text-cyberGreen mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Documentation</h3>
            <p className="text-slate-400 mb-4">Technical guides on ZK proofs, IPFS integration, and API usage.</p>
            <button onClick={() => navigate('/docs')} className="btn-cyber px-6">View Docs</button>
          </MotionDiv>
          <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-cyber text-center">
            <Newspaper className="w-12 h-12 text-cyberGreen mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Blog</h3>
            <p className="text-slate-400 mb-4">Articles: "ZK for Anonymity", "IPFS in Secure Storage", "DAO for Governance".</p>
            <a href="https://blog.example.com/zk-anonymity" target="_blank" rel="noopener noreferrer" className="btn-cyber px-6">Read Blog</a>  {/* Mock external; replace with /blog if built */}
          </MotionDiv>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-slate-500 py-8 border-t border-slate-700">
        <p>TECH MAVERICKS | Anna University, Chennai, Tamil Nadu | DSU DevHack 2.0 | Web3 & Blockchain</p>
      </footer>
    </div>
  )
}