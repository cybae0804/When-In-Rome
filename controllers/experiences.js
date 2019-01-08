const db = require('../db');
const mysql = require('mysql');

exports.getAll = async (req, res) => {
  try {
    let { cityjob, date, guests } = req.query;

    cityjob = cityjob ? cityjob : '';
    date = date ? date : '';
    guests = guests ? guests : 0;

    const inserts = [cityjob, cityjob, cityjob, date, guests];
    const prepared = `SELECT e.*, 
                    COUNT(r.rating) AS total_ratings, 
                    AVG(r.rating) AS average_rating
                    FROM experiences AS e
                    LEFT JOIN reviews AS r
                    ON e.id = r.experience_id
                    WHERE (e.activity LIKE CONCAT('%',? ,'%')
                    OR e.occupation LIKE CONCAT('%',? ,'%')
                    OR e.city LIKE CONCAT('%',? ,'%'))
                    AND (e.date = ?
                    AND e.guests >= ?)
                    GROUP BY e.id`;
    const query = mysql.format(prepared, inserts);
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

    sql = `SELECT * 
            FROM reviews 
            WHERE experience_id = ?`;
    query = mysql.format(sql, inserts);
    experience.reviews = await db.query(query);

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

exports.postOne = async (req, res) => {
  // S3 stuff...
  try {
    const fields = { activity, occupation, city, country, price, guests, date, host, host_info, activity_info } = req.body;
    const sql = `INSERT INTO experiences (activity, occupation, city, country, 
                                          price, guests, date, host, host_info, 
                                          activity_info, image)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const inserts = [...Object.values(fields)];
    const query = mysql.format(sql, inserts);

    await db.query(query);
    res.send({
      success: true,
    });
  } catch (err) {
    res.status(422).send('Error posting experience');
  }
};
