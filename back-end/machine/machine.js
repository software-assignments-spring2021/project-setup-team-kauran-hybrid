const {PythonShell}=require('python-shell');
const express = require("express");
const router = express.Router();
const mongo=require('../mongo/mongo.js');
const dotenv=require('dotenv');

const posterity=async(res)=>{
    let pyshell=new PythonShell('./machine/machine.py', {mode: "text"});
    
    //this gets all the course data!!
    
    await mongo.mongoGetCourses().then(results=>{
        //your algorithm should need to feed from this results!
        //so probabaly do things in here!!
        // console.log(results);
        try {pyshell.send(JSON.stringify({"data":results, "input":[120, 100, 20, 5]}));}
        catch(err) {console.log(err)}
        
    });
    // pyshell.send(JSON.stringify([120, 100, 20, 5]));

    pyshell.on('message',function(message){
        // console.log(message);
        // parseInt(message[0]) <= 1 ? res.send(message):null;
        res.send(message);
    });
    

    pyshell.end(function (err,code,signal){
        if(err) throw err;
        // console.log('Exit code was: '+code);
        // console.log('Exit signal was: '+signal);
        // console.log('finished');
    });
};
router.get("/",(req,res)=>{
    posterity(res);
    // res.send('machine_learning_site');

});
module.exports={
    router:router
}