const client = require('./client.cjs');
const createExercise = require('./exercises.cjs');
const createMeal = require('./meals.cjs');
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
  await createExercise(`Dumbbell Bicep Curls`, `medium`, `{biceps}`, `strength`);
  await createExercise(`Tricep Dips`, `medium`, `{triceps}`, `strength`);
  await createExercise(`Stair Climber`, `easy`, `{cardio}`, `weightloss`);
  await createExercise(`Seated Row`, `medium`, `{back, biceps}`, `strength`);
  await createExercise(`Burpees`, `hard`, `{cardio}`, `weightloss`);
  await createExercise(`Russian Twists`, `medium`, `{core}`, `strength`);
  await createExercise(`Walking Lunges`, `easy`, `{legs, glutes}`, `strength`);
  await createExercise(`Treadmill Sprint`, `hard`, `{cardio}`, `weightloss`);
  await createExercise(`Chest Fly`, `medium`, `{chest}`, `strength`);
  await createExercise(`Sit-ups`, `easy`, `{core}`, `strength`);
  await createExercise(`Flutter Kicks`, `easy`, `{core}`, `strength`);
  await createExercise(`Hanging Leg Lifts`, `hard`, `{core}`, `strength`);
  await createExercise(`Deadly Sevens`, `hard`, `{biceps}`, `strength`);
  await createExercise(`Machine Bicep Curls`, `easy`, `{biceps}`, `strength`);
  await createExercise(`Machine Hamstring Curls`, `easy`, `{hamstrings, glutes, legs}`, `strength`);
  await createExercise(`Weighted Sprinter Stretch`, `hard`, `{back, hamstrings, glutes, legs}`, `strength`);
  await createExercise(`Single Leg Deadlift`, `hard`, `{back, hamstrings, glutes, legs}`, `strength`);
  await createExercise(`Split Squat`, `medium`, `{back, hamstrings, glutes, legs}`, `strength`);
  
  await createMeal(`Zoodle Soup`, `lowcal`, 100, `yoganstuff`);
  await createMeal(`Citrus Couscous Salad w/ Pistachios`, `lowcal`, 95, `yoganstuff`);
  await createMeal(`Creamy Cucumber Salad`, `lowcal`, 90, `BalancedBody`);
  await createMeal(`Apples with Peanut Butter`, `lowcal`, 95, `fullstrengthstrong`);
  await createMeal(`Cottage Cheese w/ Blueberries`, `lowcal`, 80, `yoganstuff`);
  await createMeal(`Cheese, Veggie, Egg Muffin`, `protein`, 100, `yoganstuff`);
  await createMeal(`Hard-Boiled Eggs`, `protein`, 70, `ChickenKing`);
  await createMeal(`Steamed Cod`, `protein`, 95, `LightWeightRonnie`);
  await createMeal(`Egg White, Black Pepper & Spinach Omelette`, `protein`, 95, `BroteinBromigo`);
  await createMeal(`One Egg Ham Omelette`, `protein`, 97, `SourdoughSam`);
  await createMeal(`Avocado Toast`, `lowcal`, 180, `BalancedBody`);
  await createMeal(`Broccoli Salad`, `lowcal`, 120, `BalancedBody`);
  await createMeal(`1 Cup Edamame`, `lowcal`, 180, `fullstrengthstrong`);
  await createMeal(`English Muffin w/ Cream Cheese`, `lowcal`, 155, `BalancedBody`);
  await createMeal(`English Muffin Mini Pizza`, `lowcal`, 150, `SourdoughSam`);
  await createMeal(`Quest Blueberry Protein Bar`, `protein`, 180, `fullstrengthstrong`);
  await createMeal(`Joes Special (Ground Beef, Liver & Heart)`, `protein`, 180, `joecallahan`);
  await createMeal(`Protein Pancakes`, `protein`, 180, `BroteinBromigo`);
  await createMeal(`Greek Yogurt & Raw Honey`, `protein`, 165, `BroteinBromigo`);
  await createMeal(`Fruit, Yogurt & Milk Smoothie`, `protein`, 190, `SourdoughSam`);
  await createMeal(`Grilled Beef & Vegetable Kebabs`, `lowcal`, 240, `SourdoughSam`);
  await createMeal(`Spaghetti Squash & Meat Sauce`, `lowcal`, 300, `BalancedBody`);
  await createMeal(`Chicken Noodle Soup`, `lowcal`, 270, `ChickenKing`);
  await createMeal(`Skinny Lasagna Rolls`, `lowcal`, 290, `willtrainforcarbs`);
  await createMeal(`Chicken Enchiladas in Green Chili Sauce`, `lowcal`, 280, `bunnyracer40`);
  await createMeal(`Teriyaki Tri Tip & Bell Peppers`, `protein`, 250, `joecallahan`);
  await createMeal(`Turkey, Cheese Rollups`, `protein`, 250, `LightWeightRonnie`);
  await createMeal(`Beef & Potato Stew`, `protein`, 290, `LightWeightRonnie`);
  await createMeal(`Barbeque Chicken & Avocado Quesadilla`, `protein`, 295, `willtrainforcarbs`);
  await createMeal(`Chicken & Broccoli Stir Fry`, `protein`, 290, `duckracer25`);
  await createMeal(`Sheet Pan Chicken Fajitas`, `lowcal`, 310, `ChickenKing`);
  await createMeal(`Chicken Caesar Wrap`, `lowcal`, 400, `ChickenKing`);
  await createMeal(`Creamy White Chili w/ Cream Cheese`, `lowcal`, 395, `quackracer6`);
  await createMeal(`White Bean & Veggie Salad`, `lowcal`, 320, `raceme4chips`);
  await createMeal(`Shrimp Scampi`, `lowcal`, 390, `wouldanyonelikeashrimprace`);
  await createMeal(`BBQ Chicken Tacos w/ Red Cabbage Slaw`, `protein`, 360, `emojiraceforever`);
  await createMeal(`One Pan Chicken & Chorizo`, `protein`, 370, `iraceducks`);
  await createMeal(`Poached Eggs w/ Smashed Avocado & Tomatoes`, `protein`, 350, `iprefersilence`);
  await createMeal(`Wild Salmon & Veggies Over Wild Rice`, `protein`, 345, `bunnyracer999`);
  await createMeal(`Spicy Meatballs w/ Black Bean Chili`, `protein`, 395, `swollpatrol`);
  await createMeal(`Cheese, Spinach, Ground Beef Omelette`, `protein`, 470, `LightWeightRonnie`);
  await createMeal(`Zucchini Lasagna`, `lowcal`, 480, `willtrainforcarbs`);
  await createMeal(`Grilled Beef Patty w/ Cheddar & Ketchup`, `protein`, 420, `joecallahan`);
  await createMeal(`Healthy Lemon Garlic Chicken`, `protein`, 430, `ChickenKing`);
  await createMeal(`Healthy Tuna Salad`, `protein`, 460, `tunadeluna`);
  await createMeal(`Korean Steak, Kimchi & Cauliflower Rice Bowl`, `lowcal`, 490, `tunadeluna`);
  await createMeal(`Stuffed Sweet Potatoes w/ Chili`, `lowcal`, 490, `swollpatrol`);
  await createMeal(`Philly Cheesesteak Stuffed Peppers`, `protein`, 450, `swollpatrol`);
  await createMeal(`Beef Pad Thai`, `lowcal`, 470, `quackracer6`);
  await createMeal(`Sheet Pan Steak, Potatoes & Asparagus`, `lowcal`, 490, `joecallahan`);

  await createProfile(`test`, `password`, `Test User`, 64, 130, 85, `female`);
  await createProfile(`joecallahan`, `grizzly`, `Joe Callahan`, 70, 260, 34, `male`);
  await createProfile(`yoganstuff`, `meditate`, `Jim Yoga`, 72, 175, 40, `male`);

  await createLog(`joecallahan`, 1, 3, 5, 12, 315, 15, `2025-03-11`);
  await client.end();
}

syncAndSeed();