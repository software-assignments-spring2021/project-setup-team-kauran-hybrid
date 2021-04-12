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

const courses_arr=new Array();
let files = fs.readdirSync(__dirname+'/../enroll_cap_data/');
//console.log(files);
for (i in files) {
    let parser = parse({columns: true}, function (err, records) {
        if (records) {
            
            courses_arr.push(records);
            //console.log(courses_arr);
        }    
    }); 
    fs.createReadStream(__dirname+`/../enroll_cap_data/${files[i]}`).pipe(parser);
}

const dropped_arr=new Array();
let drop_files = fs.readdirSync(__dirname+'/../course_data/');
//console.log(files);
for (i in drop_files) {
    let parser = parse({columns: true}, function (err, records) {
        if (records) {
            
            dropped_arr.push(records);
            //console.log(courses_arr);
        }
        
    }); 

    fs.createReadStream(__dirname+`/../course_data/${drop_files[i]}`).pipe(parser);
}
//console.log(courses_arr);
//for some reason it doens't work when I tried putting it in a fucntion 
// const read_data=()=>{
//     const courses_arr=new Array();
//     let files = fs.readdirSync(__dirname+'/../course_data/');
//     //console.log(files);
//     for (i in files) {
//         let parser = parse({columns: true}, function (err, records) {
//             if (records) {
                
//                 courses_arr
//                 .push(records);
//                 //console.log(courses_arr);
//             }
            
//         }); 

//         fs.createReadStream(__dirname+`/../course_data/${files[i]}`).pipe(parser);
//     }
//     console.log(courses_arr);
//     return courses_arr;
// };

//console.log(courses_arr);

const convertData=async(courses_dir)=>{

    const courseURL = `mongodb+srv://${user}:${pwd}@clusterwh.bhiht.mongodb.net/albert?retryWrites=true&w=majority`;
    //console.log(courses_arr);
    for (index in courses_arr) {
        const courses = courses_arr[index];
        //console.log(index);
        for (i in courses) {
            //console.log(courses);
            
            const courseNum = courses[i].Course;
            const courseName=courses[i].CourseTitle;
            const sizeCap= courses[i].EnrollmentTotal;
            const waitlistSize = courses[i].WaitCap;

            //console.log(courseNum,courseSize,waitlistSize);
            await mongo.mongoSaveCourses(courseURL,courseNum,courseName,undefined,waitlistSize,undefined,sizeCap); 
        }
    }
    console.log("done converting");
}
const convertDrops=async(courses_dir)=>{

    const courseURL = `mongodb+srv://${user}:${pwd}@clusterwh.bhiht.mongodb.net/albert?retryWrites=true&w=majority`;
    //console.log(courses_arr);
    for (index in dropped_arr) {
        const courses = dropped_arr[index];
        //console.log(index);
        for (i in courses) {
            
            if(courses[i].ClassEnrollmentStatus=='Dropped'){
                //console.log(courses[i].Subject/Number);
                const courseNum = courses[i].Course;
                const courseName=courses[i].CourseTitle;
                const droppedSize= courses[i].DistinctStudentCount;

                //console.log(courseNum,courseSize,waitlistSize);
                await mongo.mongoSaveCourses(courseURL,courseNum,courseName,undefined,undefined,droppedSize); 
            }
            else{
                const courseNum = courses[i].Course;
                const courseName=courses[i].CourseTitle;
                const courseSize= courses[i].DistinctStudentCount;

                //console.log(courseNum,courseSize,waitlistSize);
                await mongo.mongoSaveCourses(courseURL,courseNum,courseName,courseSize); 
            }
            
        }
    }
    console.log("done converting");
}

router.get("/", (req,res) => {
    //read_data();
    convertData();
    convertDrops();
    res.send("converting data")

})

module.exports={
    convertData: convertData,
    router:router
}