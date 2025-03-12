const client = require('./client.cjs');

const createMeal = async(mealName, mealFocus, mealCalories, postedByUsername) => {
  try {
    await client.query(`
      INSERT INTO meals (name, focus_goal, calories, username)
      VALUES ('${mealName}', '${mealFocus}', ${mealCalories}, '${postedByUsername}');
    `);
  } catch(err) {
    console.log(`CREATEMEAL ERROR MESSAGE: ${err}`);
  }
};


const getMealById = async (id) => {
  try {
    
    const sqlCommand = 'SELECT * FROM meals WHERE id = $1';

    const result = await client.query(sqlCommand,[id]);

    return result.rows[0]; 
  } catch (err) {

    console.log(`GETMEALBYID ERROR MESSAGE: ${err}`);

  }
};

const getMealByFocusGoal = async (focusGoal) => {
  try {
    
    const slqCommand = 'SELECT * FROM meals WHERE focus_goal = $1';

    const result = await client.query(slqCommand, [focusGoal]);

    return result.rows[0]; 
  } catch (err) {

    console.log(`[getMealByFocusGoal] ERROR MESSAGE: ${err}`);

  }
};

module.exports = { createMeal , getMealById, getMealByFocusGoal };
