const mongoose=require('mongoose');

const userAccountSchema = new mongoose.Schema({
    username: String,
    password: String,
    courseNum:Array,
    waitlistPos:Array,
});
const courseSchema=new mongoose.Schema({
    courseNum:String,
    courseSize:Number,
    waitlistSize:Number,
});

//must decalre mongoose models here!
const userAccounts=mongoose.model("userAccounts",userAccountSchema);
const courses=mongoose.model("courses",courseSchema);

module.exports={
    userAccounts:userAccounts,
    courses:courses

}
