import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Import routes (create files in routes/)
import authRoutes from './routes/auth.js';
import complaintRoutes from './routes/complaints.js';
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));