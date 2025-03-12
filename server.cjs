const express = require("express");
const client = require("./db/client.cjs");
const {createProfile} = require('./db/profiles.cjs');

const app = express();

app.use(express.json());

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


const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server running on port :  http://localhost:${PORT}`)
);

const connectToDb = async () => {
  await client.connect();
};

connectToDb();