// Example script: node seed.js
const User = require('./models/User');
const bcrypt = require('bcryptjs');

async function seed() {
  const hashedPw = await bcrypt.hash('password123', 10);
  await User.create({ username: 'police_admin', password: hashedPw, role: 'police' });
  await User.create({ username: 'it_admin', password: hashedPw, role: 'it' });
  // Add more
}
seed();