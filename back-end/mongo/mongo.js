const mongoose=require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const express = require("express");
const router = express.Router();
const dotenv=require('dotenv');
const whModels=require('./wh_models.js');
// const converter=require('./converter.js');
dotenv.config();

const pwd=process.env.mongoPWD;
const user=process.env.mongoUSER;
let bodyParser = require('body-parser');
// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: true }));

//copy pasted from mongoDB
//leave as an example but we probably won't use mongodb as opposed to mongoose
const mongoScript=async()=>{

    const uri = `mongodb+srv://${user}:${pwd}@clusterwh.bhiht.mongodb.net/user_accounts?retryWrites=true&w=majority`;
    const client = await new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect(err => {
        
        // perform actions on the collection object
        const cdb=client.db('sample_airbnb');
        const collection = cdb.collection("listingsAndReviews");
        
        const items = collection.find({}).toArray(function(err,docs){
            if(err) throw err;
            console.log(docs);
        })
        //console.log(collection);
        
    });
    client.close();
};
//this is for inserting user accounts without a search history
const mongoInsertAccount=async(mongoURL,username,password)=>{
    
    // console.log(user, pwd)
    await mongoose.connect(mongoURL,{useNewUrlParser:true,useUnifiedTopology:true});

    const exAcc = new whModels.userAccounts({username:username,password:password})
    await exAcc.save()
        .then(() => console.log('account created'));


    mongoose.disconnect();

};
//this is for updating user history OR creating user account along side search history
const mongoSaveUserHistory=async(mongoURL,username,password,courseNum,waitlistPos)=>{
    await mongoose.connect(mongoURL,{useNewUrlParser:true,useUnifiedTopology:true});
    //find the correct userAccount
    await whModels.userAccounts.findOne({'username':username},function(err,results){
        if(err) throw err;
        if(results==null){
            const newCourseNum=[courseNum];
            const newWaitlistPos=[waitlistPos];
            const exAcc = new whModels.userAccounts({
                username:username,
                password:password,
                courseNum:newCourseNum,
                waitlistPos:newWaitlistPos
            });
            exAcc.save()
                .then(()=>console.log('Account created'));
            results=exAcc;
        }
        else{
            console.log('Query exists, updating');
            const newCourseNum=results.courseNum.push(courseNum);
            const newWaitlistPos=results.waitlistPos.push(waitlistPos);
            //update the account with the new parameters
            results.save({
                username:username,
                password:password,
                courseNum:newCourseNum,
                waitlistPos:newWaitlistPos
            });
        }
        
        console.log(results);
    });
    mongoose.disconnect();
    
};

//this is for creating OR updating classes from albert
const mongoSaveCourses=async(mongoURL,courseNum,courseSize,waitlistSize,lectureTime,lectureLocation,status,instructor)=>{
    await mongoose.connect(mongoURL,{useNewUrlParser:true,useUnifiedTopology:true});
    //find the course if it exists
    await whModels.courses.findOne({'courseNum':courseNum},function(err,results){
        if(err) throw err;
        if(results == null){
            const newCourse=new whModels.courses({
                courseNum:courseNum,
                courseSizes:[courseSize],
                waitlistSizes:[waitlistSize],
                lectureTimes:[lectureTime],
                lectureLocations:[lectureLocation],
                instructors:[instructor],

                status:status

            });
            newCourse.save()
                .then(()=>console.log('Course created'));
            results=newCourse
        }
        else{
            //console.log('Query exists, updating');
            //console.log(results);
            let newCourseSizes;
            let newWaitlistSizes;
            let newLectureTimes;
            let newLectureLocations;
            let newInstructors;
            if (courseSize) {
                newCourseSizes=results.courseSizes.push(courseSize);
            }

            if (waitlistSize) {
                newWaitlistSizes=results.waitlistSizes.push(waitlistSize);
            }

            if (lectureTime) {
                newLectureTimes=results.lectureTimes.push(lectureTime);
            }

            if (lectureLocation) {
                newLectureLocations=results.lectureLocations.push(lectureLocation);
            }

            if (instructor) {
                newInstructors=results.instructors.push(instructor);
            }

            const newStatus=status;
            //updating, this part isn't working correctly !!!
            results.save({
                courseSizes:newCourseSizes,
                waitlistSizes:newWaitlistSizes,
                lectureTimes:newLectureTimes,
                lectureLocations:newLectureLocations,
                instructors:newInstructors,
                status:newStatus

            });
        }

        //console.log(results);
    });
    mongoose.disconnect();
};


//post request for inserting user accounts
router.post("/add_user_account", async(req, res) => {
    const uri = `mongodb+srv://${user}:${pwd}@clusterwh.bhiht.mongodb.net/user_accounts?retryWrites=true&w=majority`;
    mongoInsertAccount(uri,req.body.username,req.body.password);
});
router.post('/add_courses',async(req,res)=>{
    const uri=`mongodb+srv://${user}:${pwd}@clusterwh.bhiht.mongodb.net/albert?retryWrites=true&w=majority`;
    mongoSaveCourses(uri,req.body.courseNum,req.body.courseSize,req.body.waitlistSize);
});

router.get("/",(req,res)=>{

    const userURL = `mongodb+srv://${user}:${pwd}@clusterwh.bhiht.mongodb.net/user_accounts?retryWrites=true&w=majority`;
    const courseURL = `mongodb+srv://${user}:${pwd}@clusterwh.bhiht.mongodb.net/albert?retryWrites=true&w=majority`;
    //mongoSaveUserHistory(userURL,'sp',789,'Cyber',888);
    // mongoSaveCourses(courseURL,'Cyber',100,20);
    
    res.send('mongo_router');

});

module.exports={
    mongoScript,
    mongoSaveCourses: mongoSaveCourses,
    router:router
}