import express from 'express';
import jwt from 'jsonwebtoken';
import Complaint from '../models/Complaint.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import PinataSDK from '@pinata/sdk';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const pinata = new PinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);

// Middleware to verify JWT
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  req.user = jwt.verify(token, process.env.JWT_SECRET);
  next();
};

// Submit complaint (from 'people' dashboard)
router.post('/', authMiddleware, async (req, res) => {
  if (req.user.role !== 'people') return res.status(403).json({ error: 'Forbidden' });

  const { department, text, evidence } = req.body;  // evidence: base64 or buffer from file upload

  // Classify with Gemini
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const prompt = `Analyze this complaint: "${text}". Classify as one of: normal, serious, immediate_action. Output only the classification.`;
  const result = await model.generateContent(prompt);
  const classification = result.response.text().trim().toLowerCase();

  // Upload evidence to IPFS if provided
  let evidenceCID = '';
  if (evidence) {
    const { IpfsHash } = await pinata.pinJSONToIPFS({ file: evidence });  // Or use pinFileToIPFS for actual files
    evidenceCID = IpfsHash;
  }

  const complaint = await Complaint.create({ department, text, classification, evidenceCID });
  res.json(complaint);
});

// Get complaints for department dashboard
router.get('/', authMiddleware, async (req, res) => {
  const complaints = await Complaint.find({ department: req.user.role });
  res.json(complaints);
});

router.get('/my-complaints', authMiddleware, async (req, res) => {
  if (req.user.role !== 'people') return res.status(403).json({ error: 'Forbidden' });
  const complaints = await Complaint.find({ userId: req.user.id });
  res.json(complaints);
});


router.put('/:id', authMiddleware, async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);
  if (complaint.department !== req.user.role) return res.status(403).json({ error: 'Forbidden' });
  complaint.status = req.body.status;
  await complaint.save();
  res.json(complaint);
});

// Add chat message to complaint (from either side)
router.post('/:id/chat', authMiddleware, async (req, res) => {
  const { message } = req.body;
  const complaint = await Complaint.findById(req.params.id);
  if (!complaint || (req.user.role !== 'people' && complaint.department !== req.user.role)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  complaint.chats.push({ message, senderRole: req.user.role });
  await complaint.save();
  res.json(complaint);
});

// Classify with Gemini
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const prompt = `Analyze this complaint: "${text}". Classify as one of: normal, serious, immediate_action. Output only the classification.`;

  const classification = result.response.text().trim().toLowerCase();

  // Upload evidence to IPFS if provided
  // let evidenceCID = '';
  // if (evidence) {
  //   try {
  //     // For files, use pinFileToIPFS; for demo, assuming base64 or JSON
  //     const { IpfsHash } = await pinata.pinJSONToIPFS({ file: evidence });
  //     evidenceCID = IpfsHash;
  //   } catch (err) {
  //     console.error('IPFS upload failed:', err);
  //     return res.status(500).json({ error: 'Failed to upload evidence' });
  //   }
  // }

  // Create complaint with userId for tracking (not exposed to departments)
  const complaint = await Complaint.create({
    department,
    text,
    classification,
    evidenceCID,
    userId: req.user.id, // Links to user but not shared with departments
  });
    res.json(complaint);

module.exports = router;