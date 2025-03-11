const client = require('./client.cjs');

const createMeal = async (mealName, mealFocus, mealCalories, postedByUsername) => {
  try {
    await client.query(`
      INSERT INTO meals (name, focus_goal, calories, username)
      VALUES ('${mealName}', '${mealFocus}', ${mealCalories}, '${postedByUsername});
    `);
  } catch (err) {
    console.log(err);
  }
};

module.exports = createMeal;