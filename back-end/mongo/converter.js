// const Sheets=require('./sheets');
const express = require("express");
const router = express.Router();

let fs=require('fs');
let parse=require('csv-parse');
const mongo=require('./mongo.js');
const dotenv=require('dotenv');
dotenv.config();
//const fall2019_math=require('../course_data/fall2019_math.csv');
// const papa=require(papaparse);

const pwd=process.env.mongoPWD;
const user=process.env.mongoUSER;

let courses_arr = [];

let files = fs.readdirSync(__dirname+'/../course_data/');
//console.log(files);
for (i in files) {
    let parser = parse({columns: true}, function (err, records) {
        if (records) {
            courses_arr.push(records);
        }
        //console.log(records);
    }); 

    fs.createReadStream(__dirname+`/../course_data/${files[i]}`).pipe(parser);
}

// console.log(courses_arr);

const convertData=async()=>{
    const courseURL = `mongodb+srv://${user}:${pwd}@clusterwh.bhiht.mongodb.net/albert?retryWrites=true&w=majority`;
    for (index in courses_arr) {
        const courses = courses_arr[index];
        //console.log(index);
        for (i in courses) {
            
            const courseNum = courses[i].Course;
            const courseSize = courses[i].EnrollmentTotal;
            const waitlistSize = courses[i].WaitCap;

            // if (courseNum == 'MATH-UA120') {
            //     console.log(`Index = ${index}, i = ${i}, Size = ${courseSize}`);
            // }

            await mongo.mongoSaveCourses(courseURL,courseNum,courseSize,waitlistSize);
        }
    }
    console.log("done converting");
}

router.get("/", (req,res) => {
    convertData();
    res.send("converting data")

})

module.exports={
    convertData: convertData,
    router:router
}