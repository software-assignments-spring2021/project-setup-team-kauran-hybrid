const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");
const dotenv=require('dotenv');
const mongo=require('./mongo/mongo.js');
const passport=require('passport');
const jwt = require("jsonwebtoken");
const fs = require("fs");


router.get("/", (req,res, next) => {
  // use axios to make a request to an API for our class history data
  let val=mongo.mongoGetSections().then(response=> {
    res.json(response);
    console.log(response);
  });
})

const checkToken = (req, res, next) => {
    const header = req.headers.auth;
    //console.log(header);
    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        req.token = token;
        next();
    } 
    else {
        //If header is undefined return Forbidden (403)
         res.sendStatus(403)
    }
} 
router.get('/protected',checkToken,(req,res) => {
    const PRIV_KEY=fs.readFileSync(__dirname + '/id_rsa_priv.pem', 'utf8');
    console.log("token",req.token);
    // console.log(passport.session['authorization']);
    console.log(PRIV_KEY);
    jwt.verify(req.token, PRIV_KEY, (err, authorizedData) => {
        if(err){
            console.log(authorizedData);
            //If error send Forbidden (403)
            throw err;
            res.sendStatus(403);
        } 
        else {
            res.header('authorization',req.token); 
            let val = mongo.mongoGetUserHistory(req.headers.username).then(response=> {
                res.json(response);
                console.log(response);
            });
            
            // let val=mongo.mongoGetSections().then(response=>res.json(response));
            //If token is successfully verified, we can send the autorized data 
            // let val=mongo.mongoGetSections().then(response=>res.json({
            //   response:response,
            //   message: 'Successful log in',
            //   authorizedData
            // }));
        console.log('SUCCESS: Connected to protected route');
        }
    })
    
});

module.exports = {
  router:router
};