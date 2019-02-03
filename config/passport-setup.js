const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LocalStrategy = require('passport-local').Strategy;
const config = require('./oauth');
const db = require('../db');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  const prepared = `SELECT * 
                    FROM users
                    WHERE id = ?`;
  const inserts = [id];
  const query = mysql.format(prepared, inserts);
  const [user] = await db.query(query);
  
  done(null, user);
});

const googlePassport = passport.use(
  new GoogleStrategy(config, async (accessToken, refreshToken, profile, done) => {
    const { id: google_id } = profile;
    
    try {
      const prepared = `SELECT * 
                        FROM users AS u
                        WHERE u.google_id = ?`;
      const inserts = [google_id];
      const query = mysql.format(prepared, inserts);
      const [user] = await db.query(query);
      
      if (user) {
        const { id } = user;
        
        done(null, id);
      } else {
        const { emails, name: { familyName: lastname, givenName: firstname } } = profile;
        const { value: email } = emails[0];
        
        const prepared = `INSERT INTO users (email, google_id, firstname, lastname)
                          VALUES (?, ?, ?, ?)`;
        const inserts = [email, google_id, firstname, lastname];
        const query = mysql.format(prepared, inserts);
        const result = await db.query(query);
        const { insertId: id } = result;

        done(null, id);
      }
    } catch (err) {
      console.log('Error getting/creating user with Google OAuth', err);
    }
  }
));

const localPassport = passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const prepared = `SELECT *
                        FROM users 
                        WHERE email = ?`;
      const inserts = [email];
      const query = mysql.format(prepared, inserts);
      const [user] = await db.query(query);

      if (user) {
        const { id, password: hashedPassword } = user;

        const match = await bcrypt.compare(password, hashedPassword);

        if (match) {
          done(null, id);
        } else {
          return done(null, false, { message: 'Incorrect username or password.' });
        }
      } else {
        return done(null, false, { message: 'Incorrect username or password.'});
      }
    } catch (err) {
      console.log('Error logging in locally', err);
    }
  }
));

module.exports = { googlePassport, localPassport };
