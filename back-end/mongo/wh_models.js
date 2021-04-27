const mongoose=require('mongoose');
// const app=require('../app.js')
const userAccountSchema = new mongoose.Schema({
    username: String,
    password: String,
    // courseNum:Array,
    // waitlistPos:Array,
    userHistory:Array
});
const courseSchema=new mongoose.Schema({
    courseNum:String,
    courseName:String,
    courseSizes:Array,
    waitlistSizes:Array,
    droppedSizes:Array,
    sizeCaps:Array,
    status:Array

});

const sectionSchema=new mongoose.Schema({
    courseNum:String,
    courseName:String,
    sections:Array

});

const profSchema=new mongoose.Schema({
    _id:String,
    rate:String,
    difficulty:String,
    retake:String,
    tags:Array,
    sections:Array

});


//must decalre mongoose models here!
const userAccounts=mongoose.model("userAccounts",userAccountSchema);
const courses=mongoose.model("courses",courseSchema);
const sections=mongoose.model("sections",sectionSchema);
const professors=mongoose.model('professors',profSchema);
const testingCourses=mongoose.model('testingCourses',courseSchema);
const trainingCourses=mongoose.model('trainingCourses',courseSchema);
module.exports={
    userAccounts:userAccounts,
    courses:courses,
    trainingCourses:trainingCourses,
    testingCourses:testingCourses,
    sections:sections,
    professors:professors,
    sectionSchema: sectionSchema,
    courseSchema: courseSchema,
    userAccountSchema: userAccountSchema,
    profSchema:profSchema
}
