import { motion } from 'framer-motion'
import { Shield, Code, Target, Globe, AlertCircle } from 'lucide-react'
import Tooltip from '../components/Tooltip'

const MotionDiv = motion.div

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Project Overview: Anonymous & Verifiable Feedback System</h1>
        <p className="text-slate-400">Using Zero-Knowledge Proofs for Secure Reporting</p>
      </MotionDiv>

      {/* Problem & Solution (PPT Page 1) */}
      <section className="space-y-6 mb-12">
        <MotionDiv initial={{ y: 20 }} animate={{ y: 0 }} className="card-cyber">
          <div className="flex items-center space-x-4 mb-4">
            <AlertCircle className="w-8 h-8 text-steelBlue" />
            <h2 className="text-2xl font-semibold">The Problem</h2>
          </div>
          <p className="text-slate-800 mb-4">People fear to disclose issues (education, workplace, society, corruption) due to retaliation or life threats.</p>
        </MotionDiv>

        <MotionDiv initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: 0.1 }} className="card-cyber">
          <div className="flex items-center space-x-4 mb-4">
            <Shield className="w-8 h-8 text-cyberGreen" />
            <h2 className="text-2xl font-semibold">Our Solution</h2>
          </div>
          <ul className="space-y-2 text-slate-800">
            <li>• Anonymous but verifiable feedback (ZK Proof of membership/eligibility).</li>
            <li>• Encrypted evidence on IPFS (tamper-proof). Stores encrypted complaints on IPFS → tamper-proof evidence.</li>
            <li>• Committee/Authorities can review issues without knowing reporter identity.</li>
            <li>• Identity-safety alert → if identity ever gets revealed (mistake/scam/company misuse), user is notified immediately.</li>
          </ul>
        </MotionDiv>
      </section>

      {/* Technical Approach (PPT Page 2) */}
      <section className="mb-12">
        <MotionDiv initial={{ y: 20 }} animate={{ y: 0 }} className="card-cyber mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <Code className="w-8 h-8 text-steelBlue" />
            <h2 className="text-2xl font-semibold">Technical Approach</h2>
          </div>
          <ul className="space-y-2 text-slate-800 mb-6">
            <li>• React → Frontend (UI/UX)</li>
            <li>• Noir (ZK circuits) → Zero-Knowledge Proofs for anonymous membership & one-person-one-feedback</li>
            <li>• Rust → Backend verifier & high-performance services</li>
            <li>• IPFS/Arweave → Encrypted feedback/evidence storage</li>
            <li>• Smart Contracts (Solidity/Rust-based ink!) → Verification & DAO governance</li>
          </ul>
        </MotionDiv>

        {/* Diagram Description (Text-based representation of flow) */}
        <MotionDiv initial={{ y: 20 }} animate={{ y: 0 }} className="card-cyber">
          <h3 className="text-xl font-semibold mb-4 text-black">System Flow Diagram</h3>
          <div className="bg-slate-800 p-4 rounded-lg text-sm text-slate-300">
            <p>Connect Wallet → Generate ZK Proof → Submit Feedback & Evidence → Verify Proof (Backend) → If Yes: Store Hash on IPFS/Smart Contract → View/Complete → Escalate? → If Yes: DAO Voting → Take Action</p>
            <p className="mt-2">NO paths: Reject invalid proofs. Ensures anonymity and verifiability throughout.</p>
          </div>
        </MotionDiv>
      </section>

      {/* Feasibility & Impact (PPT Page 3) */}
      <section className="space-y-6 mb-12">
        <MotionDiv initial={{ y: 20 }} animate={{ y: 0 }} className="card-cyber">
          <div className="flex items-center space-x-4 mb-4">
            <Target className="w-8 h-8 text-steelBlue" />
            <h2 className="text-2xl font-semibold">Feasibility</h2>
          </div>
          <p className="text-slate-800">Built on existing ZK frameworks (Noir), easily scalable.</p>
          <p className="text-sm text-steelBlue mt-2">Potential challenges and risks: ZK computation overhead, IPFS pinning reliability (mitigated by Arweave backup).</p>
        </MotionDiv>

        <MotionDiv initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: 0.1 }} className="card-cyber">
          <div className="flex items-center space-x-4 mb-4">
            <Globe className="w-8 h-8 text-cyberGreen" />
            <h2 className="text-2xl font-semibold">Impact</h2>
          </div>
          <ul className="space-y-2 text-slate-800">
            <li>• Honest student feedback without fear.</li>
            <li>• Employee safety & corporate transparency.</li>
            <li>• Citizens can report corruption/political problems anonymously.</li>
            <li>• Police/Government receive verified issues with proof without exposing identity.</li>
          </ul>
        </MotionDiv>
      </section>

      {/* Future Potential (PPT Page 4) */}
      <section className="mb-12">
        <MotionDiv initial={{ y: 20 }} animate={{ y: 0 }} className="card-cyber">
          <div className="flex items-center space-x-4 mb-4">
            <Globe className="w-8 h-8 text-steelBlue" />
            <h2 className="text-2xl font-semibold">Future Potential & Scalability</h2>
          </div>
          <ul className="space-y-2 text-slate-800">
            <li>• Expand into global whistleblowing platforms.</li>
            <li>• Add AI moderation & fraud detection<Tooltip text="Teased in polls: Flags suspicious votes">(Live Demo)</Tooltip>.</li>
            <li>• Integrate with government portals / NGOs for mass adoption.</li>
          </ul>
        </MotionDiv>
      </section>

      {/* Team Info */}
      <footer className="text-center text-slate-500 py-8 border-t border-slate-700">
        <p>TECH MAVERICKS | Anna University, Chennai/Tamil Nadu | DSU DevHack 2.0 Idea Submission</p>
      </footer>
    </div>
  )
}