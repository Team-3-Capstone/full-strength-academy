const client = require('./client.cjs');

const createExercise = async (exerciseName, exerciseDifficulty, exerciseMuscle, exerciseType) => {
  try {
    await client.query(`
      INSERT INTO exercises (name, difficulty, muscle_group, type)
      VALUES ('${exerciseName}', '${exerciseDifficulty}', '${exerciseMuscle}', '${exerciseType}');
    `);
  } catch (err) {
    console.log(err);
  }
};

module.exports = createExercise;