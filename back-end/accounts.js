const express = require("express");
const router = express.Router();
const axios = require("axios");
const passport=require('passport');
const jwt = require("jsonwebtoken");
const fs = require("fs");


const checkToken = (req, res, next) => {
    const header = passport.session['authorization'];
    console.log(passport.session);
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
    console.log("before if");
    jwt.verify(req.token, PRIV_KEY, (err, authorizedData) => {
        if(err){
            //If error send Forbidden (403)
            console.log('ERROR: Could not connect to the protected route');
            res.sendStatus(403);
        } 
        else {
            res.header('authorization',req.token); 
            //If token is successfully verified, we can send the autorized data 
            res.json({
            message: 'Successful log in',
            authorizedData
        });
        console.log('SUCCESS: Connected to protected route');
        }
    })
    
});
  module.exports = {
    router:router
  };