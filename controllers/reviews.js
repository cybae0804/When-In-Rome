const db = require('../db');
const mysql = require('mysql');

exports.getOne = async (req, res) => {
  try {
    const { experience_id } = req.params;
    console.log(req);
    const sql = `SELECT * 
                  FROM reviews 
                  WHERE experience_id = ?`;
    const inserts = [experience_id];
    const query = mysql.format(sql, inserts);
    const reviews = await db.query(query);

    res.send({
      success: true,
      reviews,
    });
  } catch (err) {
    res.status(422).send('Error getting reviews');
  }
};

exports.postOne = async (req, res) => {
  try {
    const { 
      user_id, 
      rating, 
      description
    } = req.body;

    const {
      experience_id
    } = req.params;

    const sql = `INSERT INTO reviews
      (experience_id, user_id, rating, description)
      VALUES (?, ?, ?, ?)`;

    const inserts = [experience_id, user_id, rating, description];
    const query = mysql.format(sql, inserts);
    await db.query(query);

    res.send({
      success: true,
    });
  } catch (err) {
    res.status(422).send('Error posting the review' + err);
  }
}