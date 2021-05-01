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

const sectionsSchema=new mongoose.Schema({
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

const newSectionSchema=new mongoose.Schema({
    courseNum:String,
    courseName:String,
    secCode:String,
    secYear:String,
    secSem:String,
    secInstructors:Array,
    secStatus:String,
    secTime:String,
    secLoc:String,
    recs:Array
});

//must decalre mongoose models here!
const userAccounts=mongoose.model("userAccounts",userAccountSchema);
const courses=mongoose.model("courses",courseSchema);
const sections=mongoose.model("sections",sectionsSchema);
const newSection=mongoose.model("newSection",newSectionSchema);
const professors=mongoose.model('professors',profSchema);
const testingCourses=mongoose.model('testingCourses',courseSchema);
const trainingCourses=mongoose.model('trainingCourses',courseSchema);
module.exports={
    userAccounts:userAccounts,
    courses:courses,
    trainingCourses:trainingCourses,
    testingCourses:testingCourses,
    sections:sections,
    newSection:newSection,
    professors:professors,
    sectionsSchema: sectionsSchema,
    newSectionSchema: newSectionSchema,
    courseSchema: courseSchema,
    userAccountSchema: userAccountSchema,
    profSchema:profSchema
}
