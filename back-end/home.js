const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");

const dotenv=require('dotenv');
dotenv.config({path:'./.env'})

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/", (req, res) => {
  const email = req.body.email
  const position = req.body.position
  const number = req.body.number
  const secCode = req.body.secCode

  axios.post(`${process.env.webhost}:3000/results`,{
    email:email,
    position:position,
    number:number,
    secCode:secCode
  })
  axios.post(`${process.env.webhost}:3000/class_modules`,{
    number:number,
    secCode:secCode
  })

  res.status(200).json({ok:true})
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