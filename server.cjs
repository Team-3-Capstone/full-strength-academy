const client = require('./db/client.cjs');
client.connect();

const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

const path = require('path');
app.use(express.static(path.join(__dirname, `dist`)));

const { createProfile, authentication, verifyToken, editProfile } = require('./db/profiles.cjs');
const createMeal = require('./db/meals.cjs');
const createLog = require('./db/logs.cjs');

//REGISTER NEW USER - PRODUCES A TOKEN UPON SUCCESSFUL REGISTRATION
app.post('/api/auth/register', async(req, res) => {
  const { username, password, fullName, height, weight, age, gender } = req.body;
  try {
    await createProfile(username, password, fullName, height, weight, age, gender);
    const token = await authentication(username, password);
    res.send({ username: `${username}`, token: `${token}` });
  } catch(err) {
    res.send({message: err.message});
  }
});

//LOGIN EXISTING USER - PRODUCES A TOKEN UPON SUCCESSFUL LOGIN
app.post('/api/auth/login', async(req, res) => {
  const { username, password } = req.body;
  const token = await authentication(username, password);
  if(token) {
    try {
      res.send({ username: `${username}`, token: `${token}` });
    } catch(err) {
      res.send({message: `Authentication error.`});
    }
  } else {
    res.send({message: `Authentication error.`});
  }
});

//TOKEN VERIFICATION - TAKE TOKEN FROM REGISTRATION OR LOGIN DIRECTLY HERE FOR VERIFICATION
app.get('/api/auth/login', async(req, res) => {
  try {
    const user = await verifyToken(req.headers.authorization);
    if(user) {
      res.send({message: `verified`});
    }
  } catch(err) {
    res.send({message: err.message});
  }
});

//GET USER DETAILS FOR DISPLAY. REQUIRES ACCESS TOKEN TO VIEW INFORMATION.
app.get('/api/auth/me', async(req, res) => {
  const user = await verifyToken(req.headers.authorization);
  try {
    if(user) {
      res.send({
        fullName: `${user.fullName}`, height: `${user.height}`, 
        weight: `${user.weight}`, age: `${user.age}`, gender: `${user.gender}` 
      });
    } else {
      res.send({message: `user not found`});
    }
  } catch(err) {
    res.send({message: err.message});
  }
});

//EDIT USER DETAILS. REQUIRES ACCESS TOKEN TO EDIT INFORMATION.
app.put('/api/auth/me', async(req, res) => {
  const user = await verifyToken(req.headers.authorization);
  const { fullName, height, weight, age, gender } = req.body;
  try {
    if(user) {
      await editProfile(user.username, fullName, height, weight, age, gender);
      res.send({ username: `${user.username}`, fullName: `${fullName}`, height: `${height}`, weight: `${weight}`, age: `${age}`, gender: `${gender}` });
    } else {
      res.send({message: err.message});
    }
  } catch(err) {
    res.send({message: err.message});
  }
});


//GET ALL LOGS (TOTAL HISTORY) CREATED BY USER. REQUIRES ACCESS TOKEN TO VIEW INFORMATION.
app.get('/api/auth/me/logs', async(req, res) => {
  const user = await verifyToken(req.headers.authorization);
  const allUserLogs = await client.query(`SELECT * FROM logs WHERE username='${user.username}';`);
  try {
    if(user) {
      res.send(allUserLogs.rows);
    } else {
      res.send({message: `You must be logged in to do this.`});
    }
  } catch(err) {
    res.send({message: err.message});
  }
});

//POST NEW LOG. REQUIRES ACCESS TOKEN.
app.post('/api/auth/me/logs', async(req, res) => {
  const user = await verifyToken(req.headers.authorization);
  const { exercise_id, meal_id, sets_completed,
    reps_per_set, weight_used, duration_minutes, date } = req.body;
  try {
    if(user) {
      await createLog(user.username, exercise_id, meal_id, sets_completed,
        reps_per_set, weight_used, duration_minutes, date);
      res.send({
        username: user.username, exerciseId: exercise_id, mealId: meal_id,
        setsCompleted: sets_completed, repsPerSet: reps_per_set, weightUsed: weight_used,
        durationMinutes: duration_minutes, logDate: date
      });
    } else {
      res.send({message: `You must be logged in to do this.`});
    }
  } catch(err) {
    res.send({message: err.message});
  }
});

//GET ALL EXERCISES
app.get('/api/exercises', async(req, res) => {
  const allExercises = await client.query(`SELECT * FROM exercises;`);
  try {
    res.send(allExercises.rows);
  } catch(err) {
    res.send({message: err.message});
  }
});

//GET EXERCISE BY ID
app.get('/api/exercises/id/:id', async(req, res) => {
  const selectedId = req.params.id;
  const selectedExercise = await client.query(`SELECT * FROM exercises WHERE id=${selectedId};`);
  try {
    res.send(selectedExercise.rows);
  } catch(err) {
    res.send({message: err.message});
  }
});

//GET ALL EXERCISES BY DIFFICULTY
app.get('/api/exercises/difficulty/:difficulty', async(req, res) => {
  const selectedDifficulty = req.params.difficulty;
  const selectedExercises = await client.query(`
    SELECT * FROM exercises WHERE difficulty='${selectedDifficulty};
  `);
  try {
    res.send(selectedExercises.rows);
  } catch(err) {
    res.send({message: err.message});
  }
});

//GET ALL EXERCISES BY MUSCLE GROUP
app.get('/api/exercises/muscle/:muscle', async(req, res) => {
  const selectedMuscle = req.params.muscle;
  const selectedExercises = await client.query(`
    SELECT * FROM exercises WHERE muscle_groups @> ARRAY['${selectedMuscle}']::varchar[];
  `);
  try {
    res.send(selectedExercises.rows);
  } catch(err) {
    res.send({message: err.message});
  }
});

//GET ALL EXERCISES BY TYPE
app.get('/api/exercises/type/:type', async(req, res) => {
  const selectedType = req.params.type;
  const selectedExercises = await client.query(`SELECT * FROM exercises WHERE type='${selectedType}';`);
  try {
    res.send(selectedExercises.rows);
  } catch(err) {
    res.send({message: err.message});
  }
});

//GET ALL EXERCISES BY TYPE & MUSCLE GROUP
app.get('/api/exercises/type/:type/muscle/:muscle', async(req, res) => {
  const selectedType = req.params.type;
  const selectedMuscle = req.params.muscle;
  const selectedExercises = await client.query(`
    SELECT * FROM exercises WHERE type='${selectedType}' AND muscle_groups @> ARRAY['${selectedMuscle}']::varchar[];
  `);
  try {
    res.send(selectedExercises.rows);
  } catch(err) {
    res.send({message: err.message});
  }
});

//GET ALL EXERCISES BY TYPE, MUSCLE GROUP, & DIFFICULTY
app.get('/api/exercises/type/:type/muscle/:muscle/difficulty/:difficulty', async(req, res) => {
  const selectedType = req.params.type;
  const selectedMuscle = req.params.muscle;
  const selectedDifficulty = req.params.difficulty;
  const selectedExercises = await client.query(`
    SELECT * FROM exercises WHERE type='${selectedType}' 
      AND muscle_groups @> ARRAY['${selectedMuscle}']::varchar[] AND difficulty='${selectedDifficulty}';
    `);
  try {
    res.send(selectedExercises.rows);
  } catch(err) {
    res.send({message: err.message});
  }
});

//GET ALL MEALS
app.get('/api/meals', async(req, res) => {
  const allMeals = await client.query(`SELECT * FROM meals;`);
  try {
    res.send(allMeals.rows);
  } catch(err) {
    res.send({message: err.message});
  }
});

//GET MEAL BY ID
app.get('/api/meals/id/:id', async(req, res) => {
  const selectedId = req.params.id;
  const selectedMeal = await client.query(`SELECT * FROM meals WHERE id=${selectedId};`);
  try {
    res.send(selectedMeal.rows);
  } catch(err) {
    res.send({message: err.message});
  }
});

//GET ALL MEALS BY FOCUS GOAL
app.get("/api/meals/focusgoal/:focusgoal", async (req, res) => {
  const selectedFocusGoal = req.params.focusgoal;
  const selectedMeals = await client.query(`SELECT * FROM meals WHERE focus_goal='${selectedFocusGoal}'`);
  try {
    res.send(selectedMeals.rows);
  } catch(err) {
    res.send({message: err.message});
  }
});

//CREATE MEALS
app.post("/api/meals", async (req, res) => {
  const { mealName, mealFocus, mealCalories, postedByUsername } = req.body;
  try {
    await createMeal(mealName, mealFocus, mealCalories, postedByUsername);
    res.send({message: `${mealName} created!`});
  } catch (err) {
    res.send({message: err.message});
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, `dist`, 'index.html'));
});

app.listen(process.env.PORT, () => {
  console.log(`Server running locally at: http://localhost:${process.env.PORT}`);
});