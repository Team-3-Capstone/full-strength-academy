const client = require('./client.cjs');

const createLog = async(user, exercise, meal, sets, reps, weight, duration, logDate) => {
  try {
    await client.query(`
      INSERT INTO logs (
        username, exercise_id, meal_id, sets_completed,
        reps_per_set, weight_used, duration_minutes, date)
      VALUES ('${user}', '${exercise}','${meal}', ${sets},
        ${reps}, ${weight}, ${duration}, '${logDate}');
    `);
  } catch(err) {
    console.log(`CREATELOG ERROR MESSAGE: ${err}`);
  }
};

module.exports = createLog;