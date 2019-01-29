const db = require('../db');
const mysql = require('mysql');

exports.get = async (req, res) => {
  try {
    const { experience_id } = req.params;

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

exports.post = async (req, res) => {
  try {
    const { id: host_id } = req.user;
    const { experience_id } = req.params;
    let prepared = `SELECT host_id
                    FROM experiences
                    WHERE id = ?`;
    let inserts = [experience_id];
    let query = mysql.format(prepared, inserts);

    const id = await db.query(query);

    if (id !== host_id) {
      return res.status(422).send('You do not have permission');
    }

    const { dates } = req.body;

    const deleteDates = dates.filter(date => date.status === 'delete');
    const insertDates = dates.filter(date => !date.status);

    // insert dates
    let preparedInserts = Array(insertDates.length).fill('(?, ?, ?, ?)').join(',');
    prepared = `INSERT INTO dates (experience_id, user_id, date, guests)
                VALUES ${preparedInserts}
                ON DUPLICATE KEY UPDATE 
                user_id = VALUES(user_id),
                guests = VALUES(guests)`;
    inserts = [];
    
    for (let date of insertDates) {
      const { user_id, date, guests } = date;

      inserts.push(experience_id, user_id, date, guests);
    }
    
    query = mysql.format(prepared, inserts);
    
    await db.query(query);

    // delete dates
    preparedInserts = Array(deleteDates.length).fill('date = ?').join(' OR ');
    prepared = `DELETE FROM dates
                WHERE experience_id = ?
                AND (${preparedInserts})`;
    insert = [];

    for (let date of deleteDates) {
      inserts.push(date.date);
    }
    
    query = mysql.format(prepared, inserts);

    await db.query(query);

    res.send({
      success: true,
    });
  } catch (err) {
    console.log(err)
    res.status(422).send('Error posting dates');
  }
};
