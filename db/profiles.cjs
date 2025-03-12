const client = require('./client.cjs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createProfile = async(usernameChoice, password, userFullName, userHeight, userWeight, userAge, userGender) => {
  try {
    const encryptedPwd = await bcrypt.hash(password, 10);
    await client.query(`
      INSERT INTO profiles (username, password, full_name, height_inches, weight_pounds, age, gender)
      VALUES ('${usernameChoice}', '${encryptedPwd}', '${userFullName}', ${userHeight}, ${userWeight}, ${userAge}, '${userGender}');
      `);
  } catch(err) {
    console.log(`CREATEPROFILE ERROR MESSAGE: ${err}`);
  }
}

const authentication = async(username, password) => {
  try {
    const { rows } = await client.query(`
        SELECT * FROM profiles WHERE username='${username}';
      `);
      const authenticatedUser = rows[0];
      if (authenticatedUser) {
        const isPassword = await bcrypt.compare(password, authenticatedUser.password);
        if(isPassword) {
          const token = await jwt.sign({username: authenticatedUser.username}, process.env.JWT_SECRET);
          return token;
        } else {
          throw new Error(`Incorrect password. Please try again.`);
        }
      } else {
        throw new Error(`Incorrect password. Please try again.`);
      }
    } catch(err) {
    console.log(`AUTHENTICATION ERROR MESSAGE: ${err}`);
  }
}

const verifyToken = async(token) => {
  try {
    const tokenVerification = await jwt.verify(token, process.env.JWT_SECRET);
    const { rows } = await client.query(`
      SELECT * FROM profiles WHERE username='${tokenVerification.username}'
    `);
    const verifiedUser = rows[0];
    if (verifiedUser) {
      return {
        username: verifiedUser.username, fullName: verifiedUser.full_name, height: verifiedUser.height_inches,
        weight: verifiedUser.weight_pounds, age: verifiedUser.age, gender: verifiedUser.gender
      }
    } else {
      throw new Error(`VERIFIYTOKEN ERROR`);
    }
  } catch(err) {
    console.log(`VERIFYTOKEN ERROR MESSAGE: ${err}`);
  }
}

module.exports = { createProfile, authentication, verifyToken }