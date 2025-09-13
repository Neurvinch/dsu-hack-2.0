// Example script: node seed.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

async function seed() {
  const hashedPw = await bcrypt.hash('password123', 10);
  await User.create({ username: 'police_admin', password: hashedPw, role: 'police' });
  await User.create({ username: 'it_admin', password: hashedPw, role: 'it' });
  // Add more
}
seed();