const {PythonShell}=require('python-shell');
const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
    
    res.send('machine_learning_site');
});
module.exports={
    router:router
}