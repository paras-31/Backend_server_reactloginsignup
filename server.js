const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS setup to allow frontend
const corsOptions = {
  origin: 'http://frontendenv.ap-south-1.elasticbeanstalk.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
};
app.use(cors(corsOptions));

// ✅ JSON body parsing
app.use(express.json());

// ✅ Routes
app.post('/api/signup', (req, res) => {
  const { username, password } = req.body;
  console.log('Received signup:', username, password);
  res.json({ message: 'Signup successful!' });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
