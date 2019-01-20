const db = require('../db');
const mysql = require('mysql');

exports.getHostBooked = async (req, res) => {
  const { user_id } = req.body;

  try {
    const prepared = `SELECT d.id, d.date, CONCAT(e.activity, " with a ", e.occupation) AS title
                      FROM dates AS d
                      LEFT JOIN experiences AS e
                      ON d.experience_id = e.id
                      WHERE e.host_id = ?
                      AND d.guests > 0
                      ORDER BY d.date ASC`
    const inserts = [user_id];
    const query = mysql.format(prepared, inserts);
    const dates = await db.query(query);

    res.send({
      success: true,
      dates,
    })
  } catch (err) {
    res.status(422).send('Error getting host\'s booked dates');
  }
};

exports.getUserBooked = async (req, res) => {

};
