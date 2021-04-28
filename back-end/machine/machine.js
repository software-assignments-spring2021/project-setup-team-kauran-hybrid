const {PythonShell}=require('python-shell');
const express = require("express");
const router = express.Router();
const mongo=require('../mongo/mongo.js');
const dotenv=require('dotenv');



const posterity=async(res, input)=>{
    let pyshell=new PythonShell('./machine/machine.py', { mode: 'text'});
    
    
    //this gets all the course data!!
    
    await mongo.mongoGetCourses().then(results=>{
        //your algorithm should need to feed from this results!
        //so probabaly do things in here!!
        // console.log(results);
        pyshell.send(JSON.stringify({"data":results, "input":input}));
    });
    // pyshell.send(JSON.stringify([120, 100, 20, 5]));

    pyshell.on('message', function (message) {
        // console.log(parseInt(message[0]));
        parseInt(message[0]) <= 1 ? res.send(message) : null;
    });
    

    pyshell.end(function (err,code,signal){
        if(err) throw err;
        // console.log('Exit code was: '+code);
        // console.log('Exit signal was: '+signal);
        // console.log('finished');
    });
};
router.get("/",(req,res)=>{
    posterity(res, [120, 100, 20, 10]);
    // res.send('machine_learning_site');

});
module.exports={
    router:router
}