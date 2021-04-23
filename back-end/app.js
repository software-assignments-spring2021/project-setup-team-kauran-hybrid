// // import and instantiate express
// const express = require("express") // CommonJS import style!
// const app = express() // instantiate an Express object
// // we will put some server logic here later...
// // export the express app we created to make it available to other modules

const multer =require('multer');
const whModels=require('./mongo/wh_models');
const axios = require('axios');
const morgan=require('morgan');
const scraper=require('./scraper');
const mocha=require('mocha');
const chai=require('chai');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config({path:'../.env'})
const { Console } = require('console');
const express = require("express");
const app = express();
const cors = require("cors"); // allow requests between localhost
const bodyParser = require("body-parser");
const passport = require('passport');
//dotenv.config({path:'.env'});
const user=process.env.mongoUSER;
const pwd=process.env.mongoPWD;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"))
app.use(cors());
const corsOptions={origin: true,credentials: true };
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // to enable calls from every domain 
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE'); // allowed actiosn
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
    if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // to deal with chrome sending an extra options request
    }
    next(); // call next middlewer in line
}); 
const URL = `mongodb+srv://${user}:${pwd}@clusterwh.bhiht.mongodb.net/albert?retryWrites=true&w=majority`;
mongoose.connect(URL,{useNewUrlParser:true,useUnifiedTopology:true});

// Import your routes here
app.use(passport.initialize());
app.use(passport.session());
app.use("/home_login", require("./home"));
app.use("/class_modules", require("./class_modules").router);
app.use("/results", require("./results").router);
app.use("/py_script",require("./mock_data/generator").router);
app.use("/mongo_script",require("./mongo/mongo").router);
app.use("/converter", require("./mongo/converter").router);
app.use('/machine',require("./machine/machine.js").router);
app.use("/class_info", require("./class_info"));
app.use("/login_logout", require("./login_logout").router);
app.use("/accounts",require("./accounts").router);
app.use("/prof_info", require("./prof_info"));
//app.use("/scraper", require("./scraper").router);


//module.exports = {app:app,sections,courses};
module.exports = app;