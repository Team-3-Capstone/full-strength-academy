const client = require('./client.cjs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createProfile = async(userName, password, userFullName, userHeight, userWeight, userAge, userGender) => {
  try {
    const encryptedPwd = await bcrypt.hash(password, 10);

    const { rows } = await client.query(`
      INSERT INTO profiles (username, password, full_name, height_inches, weight_pounds, age, gender)
      VALUES ('${userName}', '${encryptedPwd}', '${userFullName}', ${userHeight}, ${userWeight}, ${userAge}, '${userGender}')
      RETURNING *;
      `)
      const userProfile = rows[0];
      return userProfile;
  } catch(error) {
    console.log(error);
  }
}

const loginUser = async(userName, password) => {
  try {
    const { rows } = await client.query(`
        SELECT * FROM profiles WHERE username='${userName}'
      `);
      const loggedInUser = rows[0];

      if (loggedInUser) {
        const doesPasswordMatch = await bcrypt.compare(password, loggedInUser.password);
        if(doesPasswordMatch) {
          require('dotenv').config();
          const token = await jwt.sign({userName: loggedInUser.username}, process.env.JWT_SECRET)
          return token;
        } else {
          throw new Error('Login Invalid');
        }
      } else {
        throw new Error('Login Invalid');
      }
    } catch(error) {
    console.log(error);
  }
}

const verifyToken = async(token) => {
  try {
    require('dotenv').config();
    const verifyUserToken = await jwt.verify(token, process.env.JWT_SECRET);
    const { rows } = await client.query(`
      SELECT * FROM profiles WHERE username='${verifyUserToken.username}'
      `);

      const verifiedUser = rows[0];

      if (verifiedUser) {
        return verifiedUser
      } else {
        throw new Error('Invalid User')
      }
  } catch(error) {
    console.log(error);
  }
}

module.exports = { createProfile, loginUser, verifyToken }