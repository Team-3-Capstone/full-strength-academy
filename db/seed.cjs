const client = require('./client.cjs');
const createExercise = require('./exercises.cjs');
const createMeal = require('./meals.cjs');

const dropTables = async() => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS exercises;
      DROP TABLE IF EXISTS meals;
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
        muscle_group VARCHAR(30) NOT NULL,
        type VARCHAR(30) NOT NULL
      );

      CREATE TABLE meals (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        focus_goal VARCHAR(30) NOT NULL,
        calories INT NOT NULL,
        username VARCHAR(30) NOT NULL
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
  await createExercise(`Barbell Bench Press`, `Medium`, `Chest`, `Strength`);
  await createExercise(`Dumbbell Bench Press`, `Hard`, `Chest`, `Strength`);
  await createExercise(`Treadmill`, `Easy`, `Cardio`, `Weight Loss`);
  await createExercise(`Barbell Back Squat`, `Medium`, `Legs`, `Strength`);
  await createExercise(`Barbell Front Squat`, `Hard`, `Legs`, `Strength`);
  await createExercise(`Jumping Jacks`, `Easy`, `Cardio`, `Weight Loss`);
  await createMeal(`Chicken Caesar Wrap`, `Low Calorie`, 400, `ChickenKing`);
  await createMeal(`Protein Pancakes`, `Protein`, 180, `BroteinBromigo`);
  await createMeal(`Hard-Boiled Eggs`, `Protein`, 70, `ChickenKing`);
  await createMeal(`Turkey, Cheese Rollups`, `Protein`, 250, `LightWeightRonnie`);
  await createMeal(`Cheese, Spinach, Ground Beef Omelette`, `Protein`, 470, `LightWeightRonnie`);
  await createMeal(`Spaghetti Squash & Meat Sauce`, `Low Calorie`, 300, `BalancedBody`);
  await createMeal(`Broccoli Salad`, `Low Calorie`, 120, `BalancedBody`);
  await client.end();
}

syncAndSeed();