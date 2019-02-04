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
      narrowDownQuery += ` AND er.price > ?`;
    }
    
    if (priceMax) {
      inserts.push(priceMax);
      narrowDownQuery += ` AND er.price < ?`;
    }

    if (by) {
      switch(by){
        case 'rating':
          orderByQuery += 'ORDER BY er.average_rating';
          break;
        case 'price':
          orderByQuery += 'ORDER BY er.price';
          break;
        case 'date':
          orderByQuery += 'ORDER BY date';
          break;
      }

      if (desc === 'true') orderByQuery += ' DESC';
    }

    const prepared = `SELECT er.*, 
                      im.imagePath, 
                      MIN(d.date) AS date
                      FROM (
                        SELECT e.*, 
                        COUNT(r.rating) AS total_ratings, 
                        AVG(r.rating) AS average_rating
                        FROM experiences AS e
                        LEFT JOIN reviews AS r
                        ON e.id = r.experience_id
                        GROUP BY e.id
                      ) AS er
                      LEFT JOIN ( 
                      SELECT * 
                      FROM images 
                      GROUP BY experience_id
                      ) AS im
                      ON er.id = im.experience_id
                      LEFT JOIN dates AS d
                      ON d.experience_id = er.id
                      WHERE er.guests >= ?
                      AND (activity LIKE CONCAT('%', ?,'%')
                        OR occupation LIKE CONCAT('%', ?,'%')
                        OR city LIKE CONCAT('%', ?,'%'))
                      ${narrowDownQuery}
                      GROUP BY er.id
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

    let prepared = `SELECT e.*, 
                    u.firstname AS host,
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

    prepared = `SELECT r.id, 
                date, 
                rating, 
                description, 
                u.firstname AS reviewer
                FROM reviews AS r
                LEFT JOIN users AS u
                ON r.user_id = u.id
                WHERE experience_id = ?`;
    query = mysql.format(prepared, inserts);
    experience.reviews = await db.query(query);

    prepared = `SELECT imagePath 
                FROM images
                WHERE experience_id = ?`
    query = mysql.format(prepared, inserts);
    experience.images = await db.query(query);

    prepared = `SELECT id, date
                FROM dates
                WHERE experience_id = ?
                AND guests IS NULL
                OR guests = 0`;
    query = mysql.format(prepared, inserts);
    experience.dates = await db.query(query);

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
  try {
    const { id: host_id } = req.user;

    const prepared = `SELECT id 
                    FROM experiences
                    WHERE host_id = ?`;
    const inserts = [host_id];
    const query = mysql.format(prepared, inserts);
    const experiences = await db.query(query);

    const payload = {
      success: true,
    }

    if (experiences.length) {
      payload.existing = true;
    }

    res.send(payload);
  } catch (err) {
    console.log(err);
    res.status(422).send('Error getting created experiences');
  }
}

exports.post = async (req, res) => {
  try {
    const { activity, occupation, city, country, price, guests, host_info, activity_info, imagePath } = req.body;
    const { id: host_id } = req.user;

    let prepared = `INSERT INTO experiences 
                      (activity, occupation, city, country, price, guests, host_info, activity_info, host_id)
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    let inserts = [activity, occupation, city, country, price, guests, host_info, activity_info, host_id];
    let query = mysql.format(prepared, inserts);

    const { insertId: experience_id } = await db.query(query);

    prepared = `INSERT INTO images (experience_id, imagePath)
                VALUES (?, ?)`;
    inserts = [experience_id, imagePath];
    query = mysql.format(prepared, inserts);

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
    const { id: host_id } = req.user;
    const { experience_id } = req.params;
    const prepared = `UPDATE experiences 
                      SET activity = ?,
                      occupation = ?,
                      city = ?,
                      country = ?,
                      price = ?,
                      guests = ?,
                      host_info = ?,
                      activity_info = ?
                      WHERE id = ?
                      AND host_id = ?`;
    const inserts = [activity, occupation, city, country, price, guests, host_info, activity_info, experience_id, host_id];
    const query = mysql.format(prepared, inserts);

    await db.query(query);
    
    res.send({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(422).send({
      success: false,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { experience_id } = req.params;
    const { id: host_id } = req.user;
    const inserts = [experience_id, host_id];
    const prepared = `DELETE FROM experiences 
                      WHERE experiences.id = ?
                      AND host_id = ?`;
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
