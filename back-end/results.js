const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");
const scraper=require("./scraper");
const mongo=require('./mongo/mongo.js');
const dotenv=require('dotenv');
const {PythonShell}=require('python-shell');

//require("dotenv").config({ silent: true }); // save private data in .env file

const calcProbGetIn = (position, number) => {
  // console.log(position, number)
  // need another function to pull class size based on the class number
  // need another function or algorithm to calculate the probability
  return (100 - position) / 100 // this is a dummy return
}
let email;
let position;
let number;
let secCode;

router.post("/", (req, res) => {
  email = req.body.email
  position = req.body.position
  number = req.body.number
  secCode = req.body.secCode
})

const posterity=async(res, email, position, number, secCode, courseSize, wlSize)=>{
  let pyshell=new PythonShell('./machine/machine.py', {mode: "text"});
  // let prob=0;
  //this gets all the course data!!
  
  await mongo.mongoGetCourses().then(results=>{
      //your algorithm should need to feed from this results!
      //so probabaly do things in here!!
      // console.log(results);
      pyshell.send(JSON.stringify({"data":results, "input":[number, courseSize, wlSize, position]}));
  });

  pyshell.on('message',function(probGetIn){
      // console.log(message);
      // parseInt(probGetIn[0]) <= 1 ? res.send({probGetIn, email, position, number, secCode}):null;
      res.send({probGetIn, email, position, number, secCode});
  });
  

  pyshell.end(function (err,code,signal){
      if(err) throw err;
      // console.log('Exit code was: '+code);
      // console.log('Exit signal was: '+signal);
      // console.log('finished');
  });

  // console.log(prob);
  // return prob;
};

router.get("/", (req, res) => {
  //scraper.albert_scraper();
  // call some function that takes email, position, number that the user entered on the home page
  // this function returns the probability that the student gets into the class
  // console.log( calcProbGetIn(position, number) )
  // const probGetIn = (calcProbGetIn(position, number) * 100).toString()
  let probGetIn;
  // console.log( probGetIn )
  console.log(email,position,number,secCode);
  // console.log(email,position,number)
  // res.send({probGetIn, email, position, number}) // we have to send a string here so we convert the probGetIn type to string above
  //res.status(200).json({ok:true})
  position != null && number != null ? posterity(res, email, position, number, secCode, 120, 20): res.send({email, position, number, secCode});
  // probGetIn!=null ? res.send({probGetIn, email, position, number}):null;

})

module.exports = {
  router:router, 
  calcProbGetIn:calcProbGetIn,
};