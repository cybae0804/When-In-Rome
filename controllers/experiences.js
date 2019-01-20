const db = require('../db');
const mysql = require('mysql');

exports.getAll = async (req, res) => {
  try {
    let { cityjob, dateStart, dateEnd, priceMin, priceMax, guests, by, desc } = req.query;

    guests = isFinite(guests) ? Math.abs(parseInt(guests)) : 0;
    cityjob = cityjob ? cityjob : '';

    const inserts = [guests, cityjob, cityjob, cityjob];
    let narrowDownQuery = '';
    let orderByQuery = '';

    if (dateStart) {
      inserts.push(dateStart);
      narrowDownQuery += ' AND d.date > ?';
    }

    if (dateEnd) {
      inserts.push(dateEnd);
      narrowDownQuery += ' AND d.date < ?';
    }

    if (priceMin) {
      inserts.push(priceMin);
      narrowDownQuery += ` AND e.price > ?`;
    }
    
    if (priceMax) {
      inserts.push(priceMax);
      narrowDownQuery += ` AND e.price < ?`;
    }

    if (by) {
      switch(by){
        case 'rating':
          orderByQuery += 'ORDER BY average_rating';
          break;
        case 'price':
          orderByQuery += 'ORDER BY e.price';
          break;
        case 'date':
          orderByQuery += 'ORDER BY d.date';
          break;
      }

      if (desc === 'true') orderByQuery += ' DESC';
    }
    const prepared = `SELECT e.*, MIN(d.date) AS date,
                      COUNT(r.rating) AS total_ratings, 
                      AVG(r.rating) AS average_rating
                      FROM experiences AS e
                      LEFT JOIN reviews AS r
                      ON e.id = r.experience_id
                      LEFT JOIN dates AS d
                      ON d.experience_id = e.id
                      WHERE e.guests >= ?
                      AND (e.activity LIKE CONCAT('%', ?,'%')
                        OR e.occupation LIKE CONCAT('%', ?,'%')
                        OR e.city LIKE CONCAT('%', ?,'%'))
                      ${narrowDownQuery}
                      GROUP BY e.id
                      ${orderByQuery}`;

    const query = mysql.format(prepared, inserts);
    const experiences = await db.query(query);

    res.send({
      success: true,
      experiences,
    });
  } catch (err) {
    console.log(err);
    res.status(422).send('Error getting experiences');
  }
};

exports.getOne = async (req, res) => {
  const { experience_id } = req.params;

  try {
    if (!experience_id) {
      throw new Error('experience_id missing');
    }

    let prepared = `SELECT e.*, u.firstname AS host,
                    COUNT(r.rating) AS total_ratings, 
                    AVG(r.rating) AS average_rating
                    FROM experiences AS e
                    LEFT JOIN reviews AS r
                    ON e.id = r.experience_id
                    LEFT JOIN users as u
                    on e.host_id = u.id
                    WHERE e.id = ?
                    GROUP BY e.id`;
    const inserts = [experience_id];
    let query = mysql.format(prepared, inserts);
    const [experience] = await db.query(query);

    prepared = `SELECT r.id, date, rating, description, u.firstname AS reviewer
                FROM reviews AS r
                LEFT JOIN users AS u
                ON r.user_id = u.id
                WHERE experience_id = ?`;
    query = mysql.format(prepared, inserts);
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

exports.getCreated = async (req, res) => {
  const { user_id } = req.body;

  try {
    const prepared = `SELECT activity, occupation, id
                       FROM experiences AS 
                       WHERE host_id = 1`;
    const inserts = [user_id];
    const query = mysql.format(prepared, inserts);
    const experiences = await db.query(query);

    res.send({
      success: true,
      experiences,
    })
  } catch(err) {
    res.status(422).send('Error getting created experiences');
  }
};

exports.post = async (req, res) => {
  try {
    const fields = { activity, occupation, city, country, price, 
                     guests, host_info, activity_info, imagePath, host_id} = req.body;
    const prepared = `INSERT INTO experiences (activity, occupation, city, country, price,
                                               guests, host_info, activity_info, imagePath, host_id)
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const inserts = [...Object.values(fields)];
    const query = mysql.format(prepared, inserts);

    await db.query(query);

    res.send({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(422).send('Error posting experience');
  }
};

exports.put = async (req, res) => {
  try {
    const { activity, occupation, city, country, price, guests, host_info, activity_info } = req.body;
    const fields = { activity, occupation, city, country, price, guests, host_info, activity_info };
    const { experience_id } = req.params;
    const prepared = `UPDATE experiences SET activity = ?,
                                              occupation = ?,
                                              city = ?,
                                              country = ?,
                                              price = ?,
                                              guests = ?,
                                              host_info = ?,
                                              activity_info = ?
                                              WHERE id = ?`;
    const inserts = [...Object.values(fields), experience_id];
    const query = mysql.format(prepared, inserts);
    console.log(query);

    await db.query(query);
    
    res.send({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(422).send('Error putting experience');
  }
};

exports.delete = async (req, res) => {
  try {
    const { experience_id } = req.params;
    const inserts = [ experience_id ];
    const prepared = `DELETE FROM experiences 
                      WHERE experiences.id = ?`;
    const query = mysql.format(prepared, inserts);

    await db.query(query);
    res.send({
      success: true,
    });
  } catch (err) {
    res.status(422).send('Error deleting experience');
    console.log(err)
  }
}
