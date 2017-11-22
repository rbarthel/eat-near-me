require('dotenv').config();
const bodyParser = require("body-parser");
const express = require('express');
const cors = require('cors');
const app = express();
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_PLACES_API_KEY,
  Promise: Promise
});

app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Mount all public reasources
app.use(express.static('public'));

app.post('/search', (req, res) => {
  const params = {
    location: req.body.location,
    radius: Number(req.body.radius) * 1000,
    // keyword: req.body.keyword || 'restaurant',
    opennow: req.body.openNow,
    type: 'restaurant'
  };
  if (req.body.keyword) {
    params.keyword = req.body.keyword;
  };
  if (!(Number(req.body.minPrice) === 0 && Number(req.body.maxPrice) === 0)) {
    params.minprice = Number(req.body.minPrice);
    params.maxprice = Number(req.body.maxPrice);
  };
  console.log('params', params);

  googleMapsClient.placesNearby(params)
    .asPromise()
    .then((response) => {
      console.log(response.json);
      res.json(response.json.results);
    })
    .catch((err) => {
      console.error('Google Places API error: ', err);
      res.status(500);
    });
});

// Home page
// app.get('/', (req, res) => {
//   res.render('index');
// });

app.listen(8080, () => {
  console.log('Listening on port 8080');
});