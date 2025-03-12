const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verifyToken, createProfile, loginUser } = require('./db/profiles.cjs');
const client = require('./db/client.cjs');
const app = express();

app.use(express.json());

const SECRET_KEY = process.env.JWT_SECRET;

// POST /api/register - Register new user
app.post('/api/register', async (req, res) => {
  const { userName, password, userFullName, userHeight, userWeight, userAge, userGender } = req.body;

  try {
    const profile = await createProfile(userName, password, userFullName, userHeight, userWeight, userAge, userGender);
    res.status(201).json({ message: 'User registered successfully', profile });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/login - Authenticate user
app.post('/api/login', async (req, res) => {
  const { userName, password } = req.body;

  try {
    const token = await loginUser(userName, password, SECRET_KEY);

    if (token) {
      res.status(200).json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/verify - Verify JWT token
app.get('/api/verify', async (req, res) => {
  // const token = await req.headers.('Authorization')?.split(' ')[1];
  const token = await verifyToken(req.headers.authorization);

  // if (!token) {
  //   return res.status(403).json({ message: 'Token is required' });
  // }
  // console.log("Token received:", token);
  // try {
  //   const verifiedUser = await verifyToken(token, SECRET_KEY);

  //   if (verifiedUser) {
  //     res.status(200).json({ message: 'Token is valid', user: verifiedUser });
  //   } else {
  //     res.status(403).json({ message: 'Invalid token' });
  //   }
  // } catch (error) {
  //   res.status(500).json({ message: 'Server error', error: error.message });
  // }
  res.send(token.username);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);

const connectToDb = async () => {
  await client.connect();
};

connectToDb();


// HTTP response status codes are divided into five categories:
// Informational responses (100 – 199) - Communicates transfer protocol-level information.
// Successful responses (200 – 299) - Indicates that the client’s request was accepted successfully.
// Redirection messages (300 – 399) - Indicates that the client must take some additional action in order to complete their request.
// Client error responses (400 – 499) 403 invalid token 
// Server error responses (500 – 599)