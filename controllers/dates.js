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
    // let prepared = `SELECT host_id
    //                 FROM experiences
    //                 WHERE id = ?`;
    // let inserts = [host_id];
    // let query = mysql.format(prepared, inserts);

    // const id = await db.query(query);

    // if (id !== host_id) {
    //   return res.status(422).send('You do not have permission');
    // }

    const { experience_id } = req.params;
    const { dates } = req.body;
    const preparedInserts = Array(dates.length).fill('(?, ?, ?, ?)').join(',');
  
    const prepared = `INSERT INTO dates (experience_id, user_id, date, guests)
                VALUES ${preparedInserts}
                ON DUPLICATE KEY UPDATE 
                user_id = VALUES(user_id),
                guests = VALUES(guests),
                WHERE host_id = `;
    const inserts = [host_id];
    
    for (let date of dates) {
      const fields = { user_id, date, guests } = date;
      inserts.push(experience_id, ...Object.values(fields));
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
