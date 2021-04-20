const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get('/',(res,req)=>{
    res.send('Not Logged In!')
});

module.exports=router;