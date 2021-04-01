const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");
//require("dotenv").config({ silent: true }); // save private data in .env file

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/", (req, res) => {
  const email = req.body.email
  const password = req.body.your_password
  res.status(200).json({ok:true})
  console.log(email);
  //res.status(200).json({ok:true})
})

router.get("/", (req, res) => {
  const email = req.body.email
  const password = req.body.your_password
  res.send("hey there")
  //res.status(200).json({ok:true})
})

module.exports = router;