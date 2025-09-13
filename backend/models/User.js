import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nullifierHash: { type: String, unique: true, sparse: true },  // Only for 'people' role
  username: { type: String, unique: true, sparse: true },  // For departments
  password: { type: String },  // Hashed, for departments
  role: { type: String, enum: ['people', 'police', 'it', 'other_dept'], required: true },
  profile: {
    name: String,
    state: String,
    pincode: String,
    ageAbove18: Boolean,
    gender: String,
    collegeYear: String,
    class: String,
  },
});

module.exports = mongoose.model('User', userSchema);