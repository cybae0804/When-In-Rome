const db = require('../db');
const mysql = require('mysql');

exports.postOne = async (req, res) => {
  try {
    const { 
      user_id, 
      rating, 
      description
    } = req.body

    const {
      experience_id
    } = req.params;

    const sql = `INSERT INTO reviews
                  (experience_id, user_id, rating, description, date)
                  VALUES (?, ?, ?, ?, CURDATE())`;

    const inserts = [experience_id, user_id, rating, description];
    const query = mysql.format(sql, inserts);
    await db.query(query);

    res.send({
      success: true,
    });
  } catch (err) {
    res.status(422).send('Error posting review');
  }
}
