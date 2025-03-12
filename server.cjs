const client = require('./db/client.cjs');
client.connect();

const express = require('express');
const app = express();
app.use(express.json());

const { createProfile, authentication, verifyToken } = require('./db/profiles.cjs');
const createExercise = require('./db/exercises.cjs');
const { createMeal, getMealById, getMealByFocusGoal } = require('./db/meals.cjs');

app.get("/", (req, res) => {
  const slqCommand = `<center> <h1> WELCOME <br/> FULL STRENGTH ACADEMY </center> </h1>`;
  res.send(slqCommand);
});

//REGISTER NEW USER - PRODUCES A TOKEN UPON SUCCESSFUL REGISTRATION
app.post('/api/auth/register', async(req, res) => {
  const { username, password, fullName, height, weight, age, gender } = req.body;
  try {
    await createProfile(username, password, fullName, height, weight, age, gender);
    const token = await authentication(username, password);
    res.send(`Thank you, ${username}! Account successfully created. Your login token is displayed below: ${token}`);
    //^^^^^^We can rip this apart and just pass the token up later.^^^^^^^^
  } catch(err) {
    res.send({message: err.message});
  }
});

//LOGIN EXISTING USER - PRODUCES A TOKEN UPON SUCCESSFUL LOGIN
app.post('/api/auth/login', async(req, res) => {
  const { username, password } = req.body;
  try {
    const token = await authentication(username, password);
    res.send(`Thank you, ${username}! Authentication successful. Your login token is displayed below: ${token}`);
    //^^^^^^We can rip this apart and just pass the token up later.^^^^^^^^
  } catch(err) {
    res.send({message: err.message});
  }
});

//TOKEN VERIFICATION - TAKE TOKEN FROM REGISTRATION OR LOGIN DIRECTLY HERE FOR VERIFICATION
app.get('/api/auth/login', async(req, res) => {
  try {
    const user = await verifyToken(req.headers.authorization);
    //^^^^^FRONTEND "HEADERS: {AUTHORIZATION: TOKEN} COMES FROM HERE
    res.send(`Thank you, ${user.username}. You are logged in!`);
  } catch(err) {
    res.send({message: err.message});
  }
});

//GET USER DETAILS FOR DISPLAY. REQUIRES ACCESS TOKEN TO VIEW INFORMATION.
app.get('/api/auth/me', async(req, res) => {
  const user = await verifyToken(req.headers.authorization);
  if(user) {
    res.send(`Your username is ${user.username}. Your full name is ${user.fullName}.
      You're ${user.height} inches tall, weighing ${user.weight} pounds. You're a ${user.age} year old ${user.gender}.`);
  //^^^^^^WE CAN CONFIGURE THIS TO PASS UP USER INFO AS AN OBJECT AT THE APPROPRIATE TIME.
  } else {
    res.send(`How did you get here!? You must be logged in to access this feature!`);
  }
});

// POST /api/exercises - TO CREATE EXERCISES
app.post("/api/exercises", async (req, res) => {
  const { exerciseName, exerciseDifficulty, exerciseMuscle, exerciseType } = req.body;

  try {
    await createExercise(
      exerciseName,
      exerciseDifficulty,
      exerciseMuscle,
      exerciseType
    );
    res.status(201).send({ message: "Exercise created successfully!" });
  } catch (err) {
    res.status(500).send({ error: `Error creating exercise. ${err}` });
  }
});

// GET /api/meals - MEAL BY iD
app.get("/api/meals/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const meal = await getMealById(id);
    if (meal) {
      res.status(200).send(meal);
    } else {
      res.status(404).send({ message: "Meal not found" });
    }
  } catch (err) {
    res.status(500).send({ error: `Error retrieving meal: ${err}` });
  }
});

app.get("/api/mealsByFocusGoal/:focusGoal", async (req, res) => {
  const { focusGoal } = req.params;

  try {
    const meal = await getMealByFocusGoal(focusGoal);
    if (meal) {
      res.status(200).send(meal);
    } else {
      res.status(404).send({ message: "Meal not found" });
    }
  } catch (err) {
    res.status(500).send({ error: `Error retrieving meal: ${err}` });
  }
});

// POST /api/meals - TO CREATE MEALS
app.post("/api/meals", async (req, res) => {
  const { mealName, mealFocus, mealCalories, postedByUsername } = req.body;

  try {
    await createMeal(mealName, mealFocus, mealCalories, postedByUsername);
    res.status(201).send({ message: "Meal created successfully!" });
  } catch (err) {
    res.status(500).send({ error: `Error creating meal: ${err}` });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port :  http://localhost:${process.env.PORT}`);
});