const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Signup route
app.post('/api/signup', (req, res) => {
  const { username, password } = req.body;

  // Simulate success (you can replace with DB logic)
  console.log('Received signup:', username, password);
  res.json({ message: 'Signup successful!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://Backend-service.ap-south-1.elasticbeanstalk.com:${PORT}`);
});
