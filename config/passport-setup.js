const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('./oauth');
const db = require('../db');
const mysql = require('mysql');

const configuredPassport = passport.use(
  new GoogleStrategy(config, async (accessToken, refreshToken, profile, done) => {
    const { id: google_id, name: { familyName: lastname, givenName: firstname} } = profile;

    try {
      let prepared = `SELECT * 
                      FROM users AS u
                      WHERE u.google_id = ?`;
      let inserts = [google_id];
      let query = mysql.format(prepared, inserts);
      const [user] = await db.query(query);

      if (user) {
        console.log(user);
      } else {
        prepared = `INSERT INTO users (google_id, firstname, lastname)
                    VALUES (?, ?, ?)`;
        inserts = [google_id, firstname, lastname];
        query = mysql.format(prepared, inserts);
        await db.query(query);
      }

    } catch (err) {
      console.log('Error getting/creating user', err);
    }

    console.log('profile: ', profile.id);
    console.log('access token: ', accessToken);
    return done(null, profile);
  }
));

module.exports = configuredPassport;