const db = require('../db');
const mysql = require('mysql');

exports.getAll = async (req, res) => {
  try {
    const query = `SELECT e.*, 
                    COUNT(r.rating) AS total_ratings, 
                    AVG(r.rating) AS average_rating
                    FROM experiences AS e
                    LEFT JOIN reviews AS r
                    ON e.id = r.experience_id
                    GROUP BY e.id`;
    const experiences = await db.query(query);

    res.send({
      success: true,
      experiences,
    });
  } catch (err) {
    res.status(422).send('Error getting experiences');
  }
};

exports.getOne = async (req, res) => {
  const { experience_id } = req.params;

  try {
    if (!experience_id) {
      throw new Error('experience_id missing');
    }

    const sql = `SELECT e.*, 
                  COUNT(r.rating) AS total_ratings, 
                  AVG(r.rating) AS average_rating
                  FROM experiences AS e
                  LEFT JOIN reviews AS r
                  ON e.id = r.experience_id
                  WHERE e.id = ?
                  GROUP BY e.id`;
    const inserts = [experience_id];
    const query = mysql.format(sql, inserts);
    const [experience] = await db.query(query);

    if (!experience) {
      throw new Error('No experience with provided experience_id');
    }

    res.send({
      success: true,
      experience,
    });
  } catch(err) {
    res.status(422).send('Error getting experience');
  }
};
