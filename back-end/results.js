const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");
const scraper=require("./scraper")
//require("dotenv").config({ silent: true }); // save private data in .env file

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const calcProbGetIn = (position, number) => {
  // console.log(position, number)
  // need another function to pull class size based on the class number
  // need another function or algorithm to calculate the probability
  return (100 - position) / 100 // this is a dummy return
}


router.get("/", (req, res) => {
  scraper.albert_scraper();
  // call some function that takes email, position, number that the user entered on the home page
  // this function returns the probability that the student gets into the class
  // console.log( calcProbGetIn(position, number) )
  const probGetIn = (calcProbGetIn(position=7, number=123) * 100).toString()
  // console.log( probGetIn )
  res.send(probGetIn) // we have to send a string here so we convert the probGetIn type to string above
  //res.status(200).json({ok:true})
})

module.exports = {
  router:router, 
  calcProbGetIn:calcProbGetIn,
};