const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");
//require("dotenv").config({ silent: true }); // save private data in .env file

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/", (req,res, next) => {
  // use axios to make a request to an API for our class history data
  axios
    .get("https://my.api.mockaroo.com/search_history.json?key=7fa4d720")
    .then(apiResponse => res.json(apiResponse.data)) // pass data along directly to client
    .catch(err => next(err)) // pass any errors to express
  //res.status(200).json({ok:true})
})

module.exports = router;