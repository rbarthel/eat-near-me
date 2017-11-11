require('dotenv').config();
const bodyParser = require("body-parser");
const express = require('express');
const app = express();
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_PLACES_API_KEY,
  Promise: Promise
});

app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mount all public reasources
app.use(express.static('public'));

app.post('/search', (req, res) => {
  const params = {
    location: req.body.location,
    radius: req.body.radius,
    opennow: req.body.openNow,
    type: 'restaurant'
  };
  if (req.body.keyword) {
    params.keyword = req.body.keyword;
  };
  console.log(req.body.minPriceLevel, req.body.maxPriceLevel);
  console.log(!(req.body.minPriceLevel === 0 && req.body.maxPriceLevel === 4));
  if (!(req.body.minPriceLevel === 0 && req.body.maxPriceLevel === 4)) {
    params.minprice = req.body.minPriceLevel;
    params.maxprice = req.body.maxPriceLevel;
  };
  console.log(params);

  googleMapsClient.placesNearby(params)
    .asPromise()
    .then((response) => {
      res.json(response.json.results);
    })
    .catch((err) => {
      console.error('Google Places API error: ', err);
      res.status(500);
    });
});

// Home page
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(8080, () => {
  console.log('Listening on port 8080');
});