const { resolve } = require('path');

module.exports = app => {
  app.use('/api', require('./api'));

  app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, '..', 'client', 'dist', 'index.html'));
  });
}
