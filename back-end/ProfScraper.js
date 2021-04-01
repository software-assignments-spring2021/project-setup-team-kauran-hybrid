const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");
const scraper = require("./scraper");
//require("dotenv").config({ silent: true }); // save private data in .env file

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/",(req,res)=>{
  scraper.prof_scraper()
         .then(data=>(res.send(data)))
  //res.send("scraper site");
 // res.status(200).json({ok:true})
})

module.exports = router;