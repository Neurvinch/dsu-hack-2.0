const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Import routes (create files in routes/)
const authRoutes = require('./routes/auth');
const complaintRoutes = require('./routes/complaints');
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));