require('dotenv').config();
const bodyParser = require("body-parser");
const express = require('express');
const app = express();

const routes = require('./routes');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// Mount all public reasources
app.use(express.static('public'));

// Mount all api routes
app.use('/api', routes());

// Home page
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(8080, () => {
  console.log('Listening on port 8080');
});