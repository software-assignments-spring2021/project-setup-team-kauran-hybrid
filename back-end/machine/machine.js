const {PythonShell}=require('python-shell');
const express = require("express");
const router = express.Router();
const mongo=require('../mongo/mongo.js');
const dotenv=require('dotenv');



const posterity=async()=>{
    let pyshell=new PythonShell('./machine/machine.py');
    
    //this gets all the course data!!
    
    await mongo.mongoGetCourses().then(results=>{
        //your algorithm should need to feed from this results!
        //so probabaly do things in here!!
        // console.log(results);
        pyshell.send(JSON.stringify(results));
    });

    pyshell.on('message',function(message){
        console.log(message);
    });
    

    pyshell.end(function (err,code,signal){
        if(err) throw err;
        console.log('Exit code was: '+code);
        console.log('Exit signal was: '+signal);
        console.log('finished');
    });
};
router.get("/",(req,res)=>{
    posterity();
    res.send('machine_learning_site');

});
module.exports={
    router:router
}