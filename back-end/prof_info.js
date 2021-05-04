const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");
const scraper = require("./scraper");
const mongoScript=require('./mongo/mongo.js');
const { response } = require("express");
//require("dotenv").config({ silent: true }); // save private data in .env file

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
let postinfo;

router.post("/", (req, res) => {
    postinfo = req.body;
    console.log(postinfo)
  })

router.get("/", (req,res, next) => {
    let prof;
    let l = [];
    if (postinfo.prof) {
      for (let i=0; i < 1; i++) {
        console.log(postinfo.prof[i]);
        prof = postinfo.prof[i];
        mongoScript.mongoGetProfRate(prof).then(response=>res.send(response));
      }
    }
    // res.send(l);
  
})

router.get("/scraper", (req,res, next) => {
    // router.post("/", (req, res) => {
    //     const prof = req.body;
    //     console.log(prof)
    //   })
    // use axios to make a request to an API for our class info data
    // scraper.run().then(console.log);

    mongoScript.mongoGetProfs2()
               .then(profs=>{
                 for (let i = 0; i < profs.length; i++) {
                   console.log(profs[i]);
                  scraper.prof_scraper(profs[i], 'New York University').then(response=>response ? mongoScript.mongoSaveProfsRate(profs[i],response.q,response.d,response.t,response.tags):null)
                 }
               })
               .then(console.log('profs scraping done'));
    
    res.send('scraping');

    // test with storing single professor's rate
    // let prof = 'Trushant Majmudar';//Fanny Shum
    // // Fedor Bogomolov
    // // Hesam Oveys
    // // Ioakeim Ampatzoglou
    // // Jonathan Goodman
    // scraper.prof_scraper(prof, 'New York University')
    //        .then(response=>mongoScript.mongoSaveProfsRate(prof, response.q,response.d,response.t,response.tags));
    // res.send('scraping');

    
    // axios
    //   .get("https://my.api.mockaroo.com/professor.json?key=2f789220")
    //   .then(apiResponse => res.json(apiResponse.data)) // pass data along directly to client
    //   .catch(err => next(err)) // pass any errors to express
    //res.send('scraper running in the background')
    //res.status(200).json({ok:true})
}) 

module.exports = router;