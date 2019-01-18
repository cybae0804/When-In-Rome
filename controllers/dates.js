const db = require('../db');
const mysql = require('mysql');

exports.get = async (req, res) => {
  const { experience_id } = req.params;

  try {
    if (!experience_id) {
      throw new Error('experience_id missing');
    }

    const prepared = `SELECT CONCAT(firstname, " ", lastname) AS name, date, guests
                      FROM dates AS d
                      JOIN users AS u
                      ON d.user_id = u.id
                      WHERE experience_id = ?`;
    const inserts = [experience_id];
    const query = mysql.format(prepared, inserts);
    const dates = await db.query(query);

    res.send({
      success: true,
      dates,
    });
  } catch (err) {
    res.status(422).send('Error getting dates');
  }
};

// app.get('/api/experiences/:experience_id/dates', (req, res) => {
// });
// app.post('/api/experiences/:experience_id/dates', (req, res) => {
// });
// app.put('/api/experiences/:experience_id/dates/:date_id', (req, res) => {
// });
// app.delete('/api/experiences/:experience_id/dates/:date_id', (req, res) => {
// });