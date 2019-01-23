const db = require('../db');
const mysql = require('mysql');

exports.getHostDashboard = async (req, res) => {
  const { id: host_id  } = req.user;

  try {
    const result = {};

    // get dates and experience id
    let prepared = `SELECT d.id, 
                    d.date, 
                    CONCAT(e.activity, " with a ", e.occupation) AS title,
                    e.id,
                    FROM dates AS d
                    LEFT JOIN experiences AS e
                    ON d.experience_id = e.id
                    WHERE e.host_id = ?
                    AND d.guests > 0
                    ORDER BY d.date ASC`
    let inserts = [host_id];
    let query = mysql.format(prepared, inserts);
    result.dates = await db.query(query);

    // get history


    res.send({
      success: true,
      result,
    })
  } catch (err) {
    res.status(422).send('Error getting host\'s booked dates');
  }
};

exports.getUserBooked = async (req, res) => {
  
};
