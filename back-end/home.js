const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");
//require("dotenv").config({ silent: true }); // save private data in .env file

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/", (req, res) => {
  const email = req.body.email
  const position = req.body.position
  const number = req.body.number
  // const email = req.body.email
  // const position = req.body.position
  // const number = req.body.number
  // now do something amazing with this data...
  // ... then send a response of some kind
  res.status(200).json({ok:true})
  //res.send("hello")
  console.log(email);
})

router.get("/", (req, res) => {
  // const email = req.body.email
  // const position = req.body.position
  // const number = req.body.number
  // now do something amazing with this data...
  // ... then send a response of some kind
  res.send("hi")
  //res.status(200).json({ok:true})
})

module.exports = router;