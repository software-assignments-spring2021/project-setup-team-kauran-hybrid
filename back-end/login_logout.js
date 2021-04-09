const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");
//require("dotenv").config({ silent: true }); // save private data in .env file

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const enterTheID = (details) => {
  const acceptable_input = /^[0-9_$a-z]+/;
  if ((details.match(acceptable_input))) {
    if (details != null) {
      return true;
    }
  } else {
    return false;
  }
};

const loginSuccessChecker = (username, pwd) => {
  if (username != null && pwd != null) {
    if (typeof username != undefined && typeof pwd != undefined) {
      return true;
    }
  } else {
    return false;
  }
};

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

module.exports = {
  router:router,
  enterTheID:enterTheID,
  loginSuccessChecker:loginSuccessChecker,
};