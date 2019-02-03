const bcrypt = require('bcrypt');
const { localPassport } = require('../config/passport-setup');
const db = require('../db');
const mysql = require('mysql');

exports.login = (req, res, next) => {
  localPassport.authenticate('local', function (err, user, info) {
    
    if (err) return next(err);
    if (!user) return res.send({ success: false });

    req.logIn(user, function (err) {
      if (err) return next(err); 

      return res.send({ success: true });
    });
  })(req, res, next);
};

exports.signup = async (req, res) => {
  try {
    const { email, password, firstname, lastname } = req.body;

    let inserts = [email];
    let prepared = `SELECT id FROM users
                    WHERE email = ?`;
    let query = mysql.format(prepared, inserts);
    const user = await db.query(query);

    if (user.length) {
      return res.send({ success: false, message: 'This email already exists'});
    }

    prepared = `INSERT INTO users (email, password, firstname, lastname)
                VALUES (?, ?, ?, ?)`;
    const hashedPassword = bcrypt.hashSync(password, 10);
    inserts = [email, hashedPassword, firstname, lastname];
    query = mysql.format(prepared, inserts);

    await db.query(query);

    res.send({
      success: true,
    });
  } catch (err) {
    res.status(422).send('Error signing up locally');
    console.log(err)
  }
};
