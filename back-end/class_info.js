const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");
const scraper = require("./scraper");
const mongo = require("./mongo/mongo");
const dotenv=require('dotenv');
dotenv.config();

const pwd=process.env.mongoPWD;
const user=process.env.mongoUSER;

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/", (req,res, next) => {
    const secURL = `mongodb+srv://${user}:${pwd}@clusterwh.bhiht.mongodb.net/albert?retryWrites=true&w=majority`;
    mongo.mongoGetSections(secURL,"MATH-UA140", 1).then(response=>res.json(response));
  })

module.exports = router;