const db = require('../db');
const mysql = require('mysql');

exports.get = async (req, res) => {
  try {
    const { id: user_id } = req.user;
    const { experience_id } = req.params;

    const sql = `SELECT id
                  FROM reviews
                  WHERE experience_id = ?
                  AND user_id = ?`;
    const inserts = [experience_id, user_id];
    const query = mysql.format(sql, inserts);

    const reviews = await db.query(query);

    const result = {};
    result.success = reviews.length > 0;

    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(422).send('Error getting user review');
  }
}

exports.postOne = async (req, res) => {
  try {
    const { rating, review: description } = req.body
    const { id } = req.user;
    const { experience_id } = req.params;

    const sql = `INSERT INTO reviews
                  (experience_id, user_id, rating, description, date)
                  VALUES (?, ?, ?, ?, CURDATE())`;
    const inserts = [experience_id, id, rating, description];
    const query = mysql.format(sql, inserts);

    await db.query(query);
    console.log('h');
    res.send({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(422).send('Error posting review');
  }
}
