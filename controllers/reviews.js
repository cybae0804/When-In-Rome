const db = require('../db');
const mysql = require('mysql');

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

    res.send({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(422).send('Error posting review');
  }
}
