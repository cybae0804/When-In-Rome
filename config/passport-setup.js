const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('./oauth');
const db = require('../db');
const mysql = require('mysql');

passport.serializeUser((id, done) => {
  done(null, id);
})

passport.deserializeUser((id, done) => {
  done(null, id);
})

const configuredPassport = passport.use(
  new GoogleStrategy(config, async (accessToken, refreshToken, profile, done) => {
    const { id: google_id } = profile;

    try {
      console.log(profile);
      let prepared = `SELECT * 
                      FROM users AS u
                      WHERE u.google_id = ?`;
      let inserts = [google_id];
      let query = mysql.format(prepared, inserts);
      const [user] = await db.query(query);

      if (user) {
        const { id } = user;

        done(null, id);
      } else {
        const { emails, name: { familyName: lastname, givenName: firstname } } = profile;
        const { value: email } = emails[0];
        
        prepared = `INSERT INTO users (email, google_id, firstname, lastname)
                    VALUES (?, ?, ?, ?)`;
        inserts = [email, google_id, firstname, lastname];
        query = mysql.format(prepared, inserts);
        const result = await db.query(query);
        const { insertId: id } = result;

        done(null, id);
      }

    } catch (err) {
      console.log('Error getting/creating user', err);
    }
  }
));

module.exports = configuredPassport;