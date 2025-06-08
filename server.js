const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(express.json());

// ✅ Existing signup route
app.post('/api/signup', (req, res) => {
  const { username, password } = req.body;
  console.log('✅ Received signup:', username, password);
  res.json({ message: 'Signup successful!' });
});

// ✅ Login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  console.log('✅ Received login:', username, password);

  // Dummy logic: always succeed
  if (username && password) {
    res.json({ message: 'Login successful!' });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
});

// ✅ Explicitly bind to 0.0.0.0 so it's accessible publicly
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
