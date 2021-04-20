const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");
const scraper = require("./scraper");
//require("dotenv").config({ silent: true }); // save private data in .env file

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
let postinfo;

router.post("/", (req, res) => {
    postinfo = req.body;
    console.log(postinfo)
  })

router.get("/", (req,res, next) => {
    // router.post("/", (req, res) => {
    //     const prof = req.body;
    //     console.log(prof)
    //   })
    // use axios to make a request to an API for our class info data
    // scraper.run().then(console.log);
    scraper.prof_scraper(postinfo.prof[0], 'New York University').then(response=>res.json(response))
    // console.log(prof)
    // axios
    //   .get("https://my.api.mockaroo.com/professor.json?key=2f789220")
    //   .then(apiResponse => res.json(apiResponse.data)) // pass data along directly to client
    //   .catch(err => next(err)) // pass any errors to express
    //res.send('scraper running in the background')
    //res.status(200).json({ok:true})
}) 

module.exports = router;