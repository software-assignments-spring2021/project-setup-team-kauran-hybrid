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
const generator=require('./mock_data/generator.js');
const mongoScript=require('./mongo/mongo.js');
const converter=require('./mongo/converter.js');
const machineJs=require('./machine/machine.js');
const dotenv=require('dotenv');
const { Console } = require('console');
const express = require("express");
const app = express();
const cors = require("cors"); // allow requests between localhost
const bodyParser = require("body-parser");
const passport = require('passport');
dotenv.config({path:__dirname+'/./../../.env'});
const user=process.env.user;
const pwd=process.env.pwd;
//require("dotenv").config({ silent: true }); // save private data in .env file

app.use(bodyParser.urlencoded({ extended: false }));
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
const courseURL = `mongodb+srv://${user}:${pwd}@clusterwh.bhiht.mongodb.net/albert?retryWrites=true&w=majority`;
let conn = mongoose.createConnection(courseURL);

var ModelA    = conn.model('Model', new mongoose.Schema({
  title : { type : String, default : 'model in testA database' }
}));

// stored in 'testB' database
var ModelB    = conn2.model('Model', new mongoose.Schema({
  title : { type : String, default : 'model in testB database' }
}));
// Import your routes here
app.use(passport.initialize());
app.use(passport.session());
app.use("/home_login", require("./home"));
app.use("/class_modules", require("./class_modules"));
app.use("/results", require("./results").router);
app.use("/py_script",require("./mock_data/generator").router);
app.use("/mongo_script",require("./mongo/mongo").router);
app.use("/converter", require("./mongo/converter").router);
app.use('/machine',require("./machine/machine.js").router);
app.use("/class_info", require("./class_info"));
app.use("/login_logout", require("./login_logout").router);
app.use("/prof_info", require("./prof_info"));
app.use("/scraper", require("./scraper").router);


module.exports = app;
