const client = require("./db/client.cjs");
const express = require("express");
const createExercise = require("./db/exercises.cjs");
const {
  createMeal,
  getMealById,
  getMealByFocusGoal,
} = require("./db/meals.cjs");

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server running on port :  http://localhost:${PORT}`)
);

const connectToDb = async () => {
  await client.connect();
};

connectToDb();
