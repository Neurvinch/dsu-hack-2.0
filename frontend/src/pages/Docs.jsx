import { motion } from 'framer-motion'
import { Code, Shield, Database, Users } from 'lucide-react'

const MotionDiv = motion.div

export default function Docs() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Documentation: AnonSecure ZK Feedback System</h1>
        <p className="text-slate-400">Technical overview, API refs, and setup guide.</p>
      </MotionDiv>

      <section className="space-y-8">
        {/* Tech Stack */}
        <MotionDiv initial={{ y: 20 }} animate={{ y: 0 }} className="card-cyber">
          <div className="flex items-center space-x-4 mb-4">
            <Code className="w-8 h-8 text-cyberGreen" />
            <h2 className="text-2xl font-semibold">Tech Stack</h2>
          </div>
          <ul className="grid md:grid-cols-2 gap-4 text-slate-800">
            <li>• Frontend: React + Vite + Tailwind CSS + Bootstrap</li>
            <li>• ZK Proofs: Noir Circuits (anonymous membership & one-feedback)</li>
            <li>• Backend: Rust (verifier, services)</li>
            <li>• Storage: IPFS/Arweave (encrypted evidence)</li>
            <li>• Smart Contracts: Solidity/Ink! (verification & DAO)</li>
            <li>• Wallet: Wagmi/Viem (Ethereum-compatible)</li>
          </ul>
        </MotionDiv>

        {/* API Reference */}
        <MotionDiv initial={{ y: 20 }} animate={{ y: 0 }} className="card-cyber">
          <div className="flex items-center space-x-4 mb-4">
            <Shield className="w-8 h-8 text-cyberGreen" />
            <h2 className="text-2xl font-semibold">API Endpoints</h2>
          </div>
          <div className="bg-slate-800 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm text-slate-300">
{`POST /api/generate-zk
Body: { address: string, eligibilityInput: string }
Returns: { proof: string, publicSignals: array }

POST /api/submit
Body: { zkProof: object, feedback: string, evidenceHash: string }
Returns: { txHash: string }

GET /api/issues
Returns: [{ id: number, summary: string, category: string, zkVerified: bool }]

POST /api/vote
Args: { issueId: number, vote: bool } (via contract)`}
            </pre>
          </div>
        </MotionDiv>

        {/* Setup Guide */}
        <MotionDiv initial={{ y: 20 }} animate={{ y: 0 }} className="card-cyber">
          <div className="flex items-center space-x-4 mb-4">
            <Database className="w-8 h-8 text-cyberGreen" />
            <h2 className="text-2xl font-semibold">Quick Setup</h2>
          </div>
          <ol className="space-y-2 text-slate-800">
            <li>1. Clone repo: <code>git clone [your-repo]</code></li>
            <li>2. Install: <code>npm install</code> (frontend), Rust setup for backend.</li>
            <li>3. Run: <code>npm run dev</code> (frontend), backend server on port 3001.</li>
            <li>4. Deploy contracts: Hardhat/ink! on testnet.</li>
            <li>5. Test: Connect MetaMask, submit mock feedback.</li>
          </ol>
        </MotionDiv>

        {/* DAO Guide */}
        <MotionDiv initial={{ y: 20 }} animate={{ y: 0 }} className="card-cyber">
          <div className="flex items-center space-x-4 mb-4">
            <Users className="w-8 h-8 text-cyberGreen" />
            <h2 className="text-2xl font-semibold">DAO Governance</h2>
          </div>
          <p className="text-slate-800 mb-4">Escalated issues go to DAO voting. Connect wallet to participate – threshold for action: 51% yes votes.</p>
          <p className="text-sm text-steelBlue">Future: Integrate Snapshot for off-chain signaling.</p>
        </MotionDiv>
      </section>

      <footer className="text-center text-slate-500 py-8 border-t border-slate-700 mt-12">
        <p>Version 1.0 | TECH MAVERICKS | DSU DevHack 2.0</p>
      </footer>
    </div>
  )
}