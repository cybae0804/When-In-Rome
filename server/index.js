const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const { resolve } = require('path');
const db = require('./config/db.json');
const PORT = process.env.PORT || 9000;

const experiences = require('./dummy_data/experiences.js');
const dates = require('./dummy_data/dates.js');
const reviews = require('./dummy_data/reviews');

const app = express();
const connection = mysql.createConnection(db);

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(resolve(__dirname, 'client', 'dist')));

connection.connect(err => {
  if (err) throw err;

  console.log('MySql connected...');
});


// Experiences

app.get('/api/experiences/:experience_id', (req, res) => {
  const results = experiences.filter(experience => experience.ID === req.params.experience_id)[0];
  const newReviews = reviews.filter(review => review.Experience_ID === req.params.experience_id)
                            .map(review => ({ Date: review.Date, Rating: review.Rating, Description: review.Description }));
  const averageRating = newReviews.reduce((accum, current) => +accum.Rating + +current.Rating) / newReviews.length;

  results.reviews = newReviews;
  results.averageRating = averageRating;
  res.send(results);
});

app.get('/api/experiences', async (req, res) => {
  const query = 'SELECT * FROM experiences';

  connection.query(query, (err, results) => {
    if (err) {
      console.log(err);
      return res.send('Database query error');
    }

    return res.send(results);
  });
});

app.post('/api/experiences', (req, res) => {

});

app.put('/api/experiences/:experience_id', (req, res) => {

});

app.delete('/api/experiences/:experience_id', (req, res) => {

});


// Reviews

app.post('/api/experiences/:experience_id/reviews', (req, res) => {

});


// Dates

app.get('/api/experiences/:experience_id/dates', (req, res) => {
  const results = dates.filter(date => date.Experience_ID === req.params.experience_id);

  res.send(results);
});

app.post('/api/experiences/:experience_id/dates', (req, res) => {

});

app.put('/api/experiences/:experience_id/dates/:date_id', (req, res) => {

});

app.delete('/api/experiences/:experience_id/dates/:date_id', (req, res) => {

});

app.listen(PORT, () => {
  console.log('Server running on PORT: ' + PORT);
});
