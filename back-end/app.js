// // import and instantiate express
// const express = require("express") // CommonJS import style!
// const app = express() // instantiate an Express object
// // we will put some server logic here later...
// // export the express app we created to make it available to other modules

const multer =require('multer');
const axios = require('axios');
const morgan=require('morgan');
const scraper=require('./scraper');
const mocha=require('mocha');
const chai=require('chai');

const express = require("express");
const app = express();
app.use(morgan("dev"))
const cors = require("cors"); // allow requests between localhost
const bodyParser = require("body-parser");
//require("dotenv").config({ silent: true }); // save private data in .env file

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) => {
    res.send("bye!")
})
// Import your routes here
app.use("/home_login", require("./home"));
app.use("/class_modules", require("./class_modules"));
app.use("/results", require("./results").router);

app.use("/class_info", require("./class_info"));
app.use("/login_logout", require("./login_logout").router);
app.use("/prof_info", require("./prof_info"));



module.exports = app;
