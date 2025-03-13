const client = require('./client.cjs');
const createExercise = require('./exercises.cjs');
const { createMeal } = require('./meals.cjs');
const { createProfile } = require('./profiles.cjs');
const createLog = require('./logs.cjs');

const dropTables = async() => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS logs;
      DROP TABLE IF EXISTS exercises;
      DROP TABLE IF EXISTS meals;
      DROP TABLE IF EXISTS profiles;
    `);
  } catch(err) {
    console.log(`DROPTABLES ERROR MESSAGE: ${err}`);
  }
}

const createTables = async() => {
  try {
    await client.query(`
      CREATE TABLE exercises (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) UNIQUE NOT NULL,
        difficulty VARCHAR(30) NOT NULL,
        muscle_groups VARCHAR[] NOT NULL,
        type VARCHAR(30) NOT NULL
      );

      CREATE TABLE meals (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        focus_goal VARCHAR(30) NOT NULL,
        calories INT NOT NULL,
        username VARCHAR(30) NOT NULL
      );

      CREATE TABLE profiles (
        id SERIAL PRIMARY KEY,
        username VARCHAR(30) UNIQUE NOT NULL,
        password VARCHAR(60) NOT NULL,
        full_name VARCHAR(60) NOT NULL,
        height_inches INT,
        weight_pounds INT,
        age INT,
        gender VARCHAR(30)
      );

      CREATE TABLE logs (
        id SERIAL PRIMARY KEY,
        username VARCHAR(30) NOT NULL REFERENCES profiles(username),
        exercise_id INT REFERENCES exercises(id),
        meal_id INT REFERENCES meals(id),
        sets_completed INT,
        reps_per_set INT,
        weight_used INT,
        duration_minutes INT,
        date DATE
      );
    `);
  } catch(err) {
    console.log(`CREATETABLES ERROR MESSAGE: ${err}`);
  }
}

const syncAndSeed = async() => {
  await client.connect();
  await dropTables();
  await createTables();

  await createExercise(`Barbell Bench Press`, `medium`, `{chest, triceps}`, `strength`);
  await createExercise(`Dumbbell Bench Press`, `hard`, `{chest, triceps}`, `strength`);
  await createExercise(`Treadmill`, `easy`, `{cardio}`, `weightloss`);
  await createExercise(`Barbell Back Squat`, `medium`, `{legs, glutes}`, `strength`);
  await createExercise(`Barbell Front Squat`, `hard`, `{legs, glutes}`, `strength`);
  await createExercise(`Jumping Jacks`, `easy`, `{cardio}`, `weightloss`);
  await createExercise(`Deadlift`, `hard`, `{back, hamstrings, glutes}`, `strength`);
  await createExercise(`Pull-Ups`, `medium`, `{back, biceps}`, `strength`);
  await createExercise(`Push-Ups`, `easy`, `{chest, triceps}`, `strength`);
  await createExercise(`Leg Press`, `medium`, `{legs, glutes}`, `strength`);
  await createExercise(`Kettlebell Swing`, `hard`, `{legs, glutes, back}`, `strength`);
  await createExercise(`Cycling`, `medium`, `{cardio}`, `weightloss`);
  await createExercise(`Jump Rope`, `hard`, `{cardio}`, `weightloss`);
  await createExercise(`Lunges`, `medium`, `{legs, glutes}`, `strength`);
  await createExercise(`Plank`, `medium`, `{core}`, `strength`);
  await createExercise(`Mountain Climbers`, `easy`, `{cardio}`, `weightloss`);
  await createExercise(`Box Jumps`, `hard`, `{legs, glutes}`, `strength`);
  await createExercise(`Bicep Curls`, `medium`, `{biceps}`, `strength`);
  await createExercise(`Tricep Dips`, `medium`, `{triceps}`, `strength`);
  await createExercise(`Stair Climber`, `easy`, `{cardio}`, `weightloss`);
  await createExercise(`Seated Row`, `medium`, `{back, biceps}`, `strength`);
  await createExercise(`Burpees`, `hard`, `{full body}`, `weightloss`);
  await createExercise(`Russian Twists`, `medium`, `{core}`, `strength`);
  await createExercise(`Walking Lunges`, `easy`, `{legs, glutes}`, `strength`);
  await createExercise(`Treadmill Sprint`, `hard`, `{cardio}`, `weightloss`);
  await createExercise(`Chest Fly`, `medium`, `{chest}`, `strength`);

  await createMeal(`Chicken Caesar Wrap`, `Low Calorie`, 400, `ChickenKing`);
  await createMeal(`Protein Pancakes`, `Protein`, 180, `BroteinBromigo`);
  await createMeal(`Hard-Boiled Eggs`, `Protein`, 70, `ChickenKing`);
  await createMeal(`Turkey, Cheese Rollups`, `Protein`, 250, `LightWeightRonnie`);
  await createMeal(`Cheese, Spinach, Ground Beef Omelette`, `Protein`, 470, `LightWeightRonnie`);
  await createMeal(`Spaghetti Squash & Meat Sauce`, `Low Calorie`, 300, `BalancedBody`);
  await createMeal(`Broccoli Salad`, `Low Calorie`, 120, `BalancedBody`);

  await createProfile(`joecallahan`, `grizzly`, `Joe Callahan`, 70, 260, 34, `male`);
  await createProfile(`yoganstuff`, `meditate`, `Jim Yoga`, 72, 175, 40, `male`);
  await createLog(`joecallahan`, 1, 3, 5, 12, 315, 15, `2025-03-11`);
  await client.end();
}


syncAndSeed();