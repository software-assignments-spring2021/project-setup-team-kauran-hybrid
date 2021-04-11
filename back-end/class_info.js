const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");
const scraper = require("./scraper");
const mongo = require("./mongo/mongo");
const dotenv=require('dotenv');
dotenv.config({path:__dirname+'/./../../.env'});

const pwd=process.env.mongoPWD;
const user=process.env.mongoUSER;

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());



module.exports = router;