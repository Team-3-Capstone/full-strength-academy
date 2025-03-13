const client = require('./client.cjs');

const createExercise = async(exerciseName, exerciseDifficulty, muscleGroups, exerciseType) => {
  try {
    await client.query(`
      INSERT INTO exercises (name, difficulty, muscle_groups, type)
      VALUES ('${exerciseName}', '${exerciseDifficulty}', '${muscleGroups}', '${exerciseType}');
    `);
  } catch(err) {
    console.log(`CREATEEXERCISE ERROR MESSAGE: ${err}`);
  }
};

module.exports = createExercise;