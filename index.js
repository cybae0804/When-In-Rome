const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const { resolve } = require('path');
const PORT = process.env.PORT || 9000;

const passport = require('./config/passport-setup');
const app = express();

// general express setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(resolve(__dirname, 'client', 'dist')));

// cookies setup
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: ['extract_to_own_file_later'],
}));

// passport setup
app.use(passport.initialize());
app.use(passport.session());

require('./routes')(app);

app.listen(PORT, () => {
  console.log('Server running on PORT', PORT);
}).on('error', (err) => {
  console.log('Server listen error', err);
});
