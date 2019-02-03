const { resolve } = require('path');

module.exports = app => {
  app.use('/api', require('./api'));
  app.use('/oauth', require('./oauth'));
  app.use('/auth-local', require('./auth-local'));

  app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, '..', 'client', 'dist', 'index.html'));
  });
}
