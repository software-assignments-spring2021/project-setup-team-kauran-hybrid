const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");
//const scraper=require("./scraper")
//require("dotenv").config({ silent: true }); // save private data in .env file

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/",(req,res,next)=>{
  //scraper.albert_scraper(req,res, next);
  //res.send("albert_scraper");
  const year=2021;
  const semester="su";
  const school="UA";
  const subject="ECON";
  //const regis=0;
  const url='https://schedge.a1liu.com/'+year+'/'+semester+'/'+school+'/'+subject;
  //const url='https://schedge.a1liu.com/'+year+'/'+semester+'/'+regis;

  axios
    .get(url)
    .then(apiResponse => res.json(apiResponse.data)) // pass data along directly to client
    .catch(err => next(err))
  
})

module.exports = router;