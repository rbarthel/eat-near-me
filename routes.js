const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

module.exports = knex => {

  router.post('/search', (req, res) => {
    // const keyword = req.body.keyword;
    // if (req.body.price) {
    //   const price = req.body.price
    // }
    // const location = req.body.location;
    // const radius = req.body.radius;
    console.log(req.body);

    res.send(req.body);
  });

  return router;
};