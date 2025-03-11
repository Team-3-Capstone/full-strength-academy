const client = require('./client.cjs');

const createEcbync (date, resorts_id, customer_id, party_count) => {
  try {
    const { rows } = await client.query(
      `INSERT INTO reservations (date, resorts_id, customer_id, party_count)
       VALUES ('${customerName}' ,'${username}', '${encryptedPassword}');
       RETURNING *`,
      [date, resorts_id, customer_id, party_count]
    );
    return rows[0]
  } catch (err) {
    console.log(err);
  }
};

