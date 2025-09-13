import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { MessageCircle, Send, X } from 'lucide-react';
import toast from 'react-hot-toast';

const GEMINI_API_KEY = import.meta.env.VITE_REACT_APP_GEMINI_API_KEY;

const genAI = GEMINI_API_KEY
  ? new GoogleGenerativeAI(GEMINI_API_KEY)  // ✅ pass key directly
  : null;

const model = genAI
  ? genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
  : null;

console.log("Gemini Model:", model ? "Initialized" : "Using Mock");

export default function AIChat({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
// For context in prompts

  const sendMessage = async () => {
    if (!input.trim() || !model) {
      if (!model) toast.error('Gemini API key needed – using mock');
      return;
    }
    
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    
    try {
      // Enhance prompt with app context (PPT-inspired)
      const prompt = `You are AnonSecure AI Helper (ZK Feedback System). User query: ${input}. Explain simply, focus on anonymity, ZK proofs, IPFS. If about moderation, flag fraud.`;
      const result = await model.generateContent(prompt);
      const aiResponse = await result.response.text();
      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
      toast.success('AI Response Generated!');
    } catch (error) { console.error('AI Error:', error);
      toast.error('AI generation failed – using mock');
      setMessages(prev => [...prev, { role: 'ai', text: 'Mock: Gemini says – ZK keeps you anonymous while verifying eligibility!', }]); // Mock response
    }
    
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl w-full max-w-2xl h-3/4 flex flex-col">
        <div className="p-4 border-b border-slate-700 flex justify-between items-center">
          <h2 className="font-bold flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-cyberGreen" />
            <span>Gemini AI Helper (PPT Future: AI Moderation)</span>
          </h2>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`p-3 rounded-lg ${msg.role === 'user' ? 'bg-cyberGreen text-deepNavy ml-auto max-w-xs' : 'bg-slate-700'}`}>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-slate-700">
          <div className="flex space-x-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask AI: Explain ZK? Moderate this comment?" className="form-input flex-1 bg-slate-700 border-slate-600" onKeyPress={(e) => e.key === 'Enter' && sendMessage()} />
            <button onClick={sendMessage} className="btn-cyber px-4">
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-2">Examples: "Summarize corruption report" or "Is this fraud?"</p>
        </div>
      </div>
    </div>
  );
}