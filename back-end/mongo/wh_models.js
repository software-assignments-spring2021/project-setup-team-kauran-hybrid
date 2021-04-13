const mongoose=require('mongoose');

const userAccountSchema = new mongoose.Schema({
    username: String,
    password: String,
    courseNum:Array,
    waitlistPos:Array,
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


//must decalre mongoose models here!
const userAccounts=mongoose.model("userAccounts",userAccountSchema);
const courses=mongoose.model("courses",courseSchema);
const sections=mongoose.model("sections",sectionSchema);
const testingCourses=mongoose.model('testingCourses',courseSchema);
const trainingCourses=mongoose.model('trainingCourses',courseSchema);
module.exports={
    userAccounts:userAccounts,
    courses:courses,
    trainingCourses:trainingCourses,
    testingCourses:testingCourses,
    sections:sections,
    sectionSchema: sectionSchema,
    courseSchema: courseSchema,
    userAccountSchema: userAccountSchema
}
