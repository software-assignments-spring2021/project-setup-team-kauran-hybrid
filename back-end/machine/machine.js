const {PythonShell}=require('python-shell');
const express = require("express");
const router = express.Router();
const mongo=require('../mongo/mongo.js');


const posterity=()=>{
    let pyshell=new PythonShell('./mock_data/generator.py');
    pyshell.on('message',function(message){
        console.log(message);
    });

    pyshell.end(function (err,code,signal){
        if(err) throw err;
        console.log('Exit code was: '+code);
        console.log('Exit signal was: '+signal);
        console.log('finished');
    });
}
router.get("/",(req,res)=>{
    posterity();
    res.send('machine_learning_site');

});
module.exports={
    router:router
}