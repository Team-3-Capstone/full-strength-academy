const client = require('./client.cjs');

const createExercises = async (name, difficulty, muscle_group, type) => {
  try {
    const { rows } = await client.query(
      `INSERT INTO exercises (name, difficulty, muscle_group, type)
       VALUES ('${name}', '${difficulty}', '${muscle_group}', '${type}')
       RETURNING *`
    );
    return rows[0];
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createExercises
};
