const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const { resolve } = require('path');
const { cookieSessionKey } = require('./config').keys;
const PORT = 443;

const { googlePassport, localPassport } = require('./config/passport-setup');
const app = express();

// general express setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(resolve(__dirname, 'client', 'dist')));

// cookies setup
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [cookieSessionKey],
  httpOnly: false,
}));

// passport setup
app.use(googlePassport.initialize());
app.use(googlePassport.session());
app.use(localPassport.initialize());
app.use(localPassport.session());

require('./routes')(app);

app.listen(PORT, () => {
  console.log('Server running on PORT', PORT);
}).on('error', (err) => {
  console.log('Server listen error', err);
});
