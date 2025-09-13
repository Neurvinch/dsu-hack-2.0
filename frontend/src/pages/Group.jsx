import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MessageCircle, Send, Image as ImageIcon, File, Lock as LockIcon, Check } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { useApp } from '../context/AppContext';
import toast from 'react-hot-toast';

export default function Group() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { generateZkProof } = useApp();
  const anonId = localStorage.getItem('anonId') || 'anonUser';

  useEffect(() => {
    // Fetch group + events
    fetch(`http://localhost:3001/groups/${id}`)
      .then(res => res.json())
      .then(data => {
        setEvents(data.events || []);
        setSelectedEvent(data.events?.[0] || null);
      });

    // Fetch messages
    const fetchMessages = async () => {
      const res = await fetch(`http://localhost:3001/messages/group${id}`);
      const data = await res.json();
      setMessages(data);
    };
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [id]);

  const encryptFile = async (file) => {
    const key = await window.crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt']);
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    await window.crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, await file.arrayBuffer());
    const mockCid = `ipfs://encrypted-${file.name}-${Date.now()}`;
    toast.success(`Encrypted & Stored on IPFS: ${mockCid}`);
    return mockCid;
  };

  // Example for sendMessage:
  const moderateContent = async (content) => {
    if (!model) return { flagged: false, reason: 'Mock: Safe' };
    try {
      const result = await model.generateContent(`Moderate for fraud/harm: "${content}". Output JSON: {"flagged": true/false, "reason": "brief"}`);
      const response = await result.response.text();
      return JSON.parse(response);
    } catch (err) { console.error(err);
      return { flagged: false, reason: 'Mock safe' };
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (files) => {
      const file = files[0];
      const cid = await encryptFile(file);
      const zkProof = generateZkProof({ category: 'file-upload', file: file.name });
      const newMsg = { id: Date.now(), sender: anonId, message: '', timestamp: new Date().toISOString(), file: cid, zkVerified: zkProof.eligible };
      await fetch(`http://localhost:3001/messages/group${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMsg)
      });
      setMessages(prev => [...prev, newMsg]);
    }
  });


  const sendMessage = async () => {
    const mod = await moderateContent(newMessage);
    if (mod.flagged) {
      toast.error(`AI Flagged: ${mod.reason} (PPT Fraud Detection)`);
      return;
    }
    if (newMessage.trim()) {
      const zkProof = generateZkProof({ category: 'message', text: newMessage });
      const newMsg = { id: Date.now(), sender: anonId, message: newMessage, timestamp: new Date().toISOString(), file: null, zkVerified: zkProof.eligible };
      await fetch(`http://localhost:3001/messages/group${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMsg)
      });
      setNewMessage('');
      const res = await fetch(`http://localhost:3001/messages/group${id}`);
      setMessages(await res.json());
    }
  };

  const votePoll = async (option) => {
    const zkProof = generateZkProof({ category: 'poll-vote', option });
    if (!zkProof.eligible) return;

    const updatedPoll = {
      ...selectedEvent.poll,
      votes: { ...selectedEvent.poll.votes, [option]: (selectedEvent.poll.votes[option] || 0) + 1 },
      totalVotes: selectedEvent.poll.totalVotes + 1
    };
    const updatedEvent = { ...selectedEvent, poll: updatedPoll };

    if (Math.random() < 0.1) toast.info('AI Moderation: Vote flagged for review.');

    const groupRes = await fetch(`http://localhost:3001/groups/${id}`);
    const groupData = await groupRes.json();

    await fetch(`http://localhost:3001/groups/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...groupData, events: events.map(e => e.id === selectedEvent.id ? updatedEvent : e) })
    });

    setEvents(prev => prev.map(e => e.id === selectedEvent.id ? updatedEvent : e));
    setSelectedEvent(updatedEvent);
    toast.success(`Voted anonymously (ZK verified)`);
  };

  if (!selectedEvent) return <div>Loading group...</div>;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/3 bg-slate-800 border-r border-slate-700 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Events & Polls</h2>
        {events.map(event => (
          <div key={event.id} className="card-cyber mb-4 p-4 cursor-pointer" onClick={() => setSelectedEvent(event)}>
            <h3 className="font-semibold">{event.title}</h3>
            {event.image && <img src={event.image} alt="Event" className="w-full h-32 object-cover rounded mt-2" />}
            <p className="text-slate-400 mt-2">{event.description}</p>
            {event.poll && (
              <div className="mt-4">
                <p className="font-medium">{event.poll.question}</p>
                {Object.keys(event.poll.options).map(opt => (
                  <button key={opt} onClick={() => votePoll(opt)} className="block w-full text-left p-2 bg-slate-700 rounded mt-1 hover:bg-slate-600">
                    {opt} ({event.poll.votes[opt] || 0} votes)
                  </button>
                ))}
                <p className="text-sm text-slate-400">Total: {event.poll.totalVotes}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="bg-slate-700 p-4 border-b border-slate-600">
          <h2 className="font-bold">Group {id}</h2>
          <p className="text-slate-400">Anonymous chat – ZK verified</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === anonId ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${msg.sender === anonId ? 'bg-cyberGreen text-deepNavy' : 'bg-slate-700 text-white'}`}>
                <p className="font-medium flex items-center">
                  {msg.sender}
                  {msg.zkVerified && <Check className="w-3 h-3 text-cyberGreen ml-1" title="ZK Verified" />}
                </p>
                {msg.message && <p>{msg.message}</p>}
                {msg.file && (
                  <div className="flex items-center space-x-2 mt-1">
                    <LockIcon className="w-4 h-4 text-cyberGreen" />
                    <span className="text-sm">Encrypted File: {msg.file}</span>
                  </div>
                )}
                <p className="text-xs text-slate-500 mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-600 flex space-x-2">
          <div {...getRootProps()} className="btn-cyber p-2">
            <input {...getInputProps()} />
            <ImageIcon className="w-5 h-5" /> Share File
          </div>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type message..."
            className="form-input flex-1 bg-slate-700 border-slate-600"
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage} className="btn-cyber px-4">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
