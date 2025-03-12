const express = require("express");
const client = require("./db/client.cjs");
const createExercise = require("./db/exercises.cjs");
const createMeal = require("./db/meals.cjs");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  const slqCommand = `<center> <h1> WELCOME <br/> FULL STRENGTH ACADEMY </center> </h1>`;

  res.send(slqCommand);
});

// POST /api/exercises - TO CREATE EXERCISES
app.post("/api/exercises", async (req, res) => {
  const { exerciseName, exerciseDifficulty, exerciseMuscle, exerciseType } =
    req.body;

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

// POST /api/meals - TO CREATE MEALS
app.post('/api/meals', async (req, res) => {
  const { mealName, mealFocus, mealCalories, postedByUsername } = req.body;

  try {
    await createMeal(mealName, mealFocus, mealCalories, postedByUsername);
    res.status(201).send({ message: 'Meal created successfully!' });
  } catch (err) {
    res.status(500).send({ error: `Error creating meal: ${err}` });
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