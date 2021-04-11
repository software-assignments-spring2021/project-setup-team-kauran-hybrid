const mongoose=require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const express = require("express");
const router = express.Router();
const dotenv=require('dotenv');
const whModels=require('./wh_models.js');
// const converter=require('./converter.js');
dotenv.config({path:__dirname+'/./../../.env'});

const pwd=process.env.mongoPWD;
const user=process.env.mongoUSER;
console.log(pwd)
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
const mongoSaveCourses=async(mongoURL,courseNum,courseName,courseSize,waitlistSize,droppedSize,sizeCap,status)=>{
    await mongoose.connect(mongoURL,{useNewUrlParser:true,useUnifiedTopology:true});
    //find the course if it exists
    await whModels.courses.findOne({'courseNum':courseNum},function(err,results){
        if(err) throw err;
        if(results == null){
            const newCourse=new whModels.courses({
                courseNum:courseNum,
                courseName:courseName,
                sizeCaps:[sizeCap],
                courseSizes:[courseSize],
                waitlistSizes:[waitlistSize],
                droppedSizes:[droppedSize],
                //status: status
                statuses:[status]

            });
            newCourse.save()
                .then(()=>console.log('Course created'));
            results=newCourse
        }
        else{
            console.log('Query exists, updating');
            //console.log(results);
            let newSizeCaps;
            let newCourseSizes;
            let newWaitlistSizes;
            let newDroppedSizes;
            let newStatuses;
            if(sizeCap){
                newSizeCaps=results.sizeCaps.push(sizeCap);
            }
            if (courseSize) {
                newCourseSizes=results.courseSizes.push(courseSize);
            }

            if (waitlistSize) {
                newWaitlistSizes=results.waitlistSizes.push(waitlistSize);
            }
            if(droppedSize){
                newDroppedSizes=results.droppedSizes.push(droppedSize);
            }

            if (status) {
                newStatuses=results.statuses.push(status);
            }

            //const newStatus=status;
            //updating, this part isn't working correctly !!!
            results.save({
                sizeCaps:newSizeCaps,
                courseSizes:newCourseSizes,
                waitlistSizes:newWaitlistSizes,
                droppedSizes:newDroppedSizes,
                status:newStatuses

            });
        }

        //console.log(results);
    });
    //mongoose.disconnect();
};

//this is for creating OR updating classes from albert
const mongoSaveSections=async(mongoURL,courseNum,courseName,section,year,semester)=>{
    await mongoose.connect(mongoURL,{useNewUrlParser:true,useUnifiedTopology:true});
    //find the course if it exists
    await whModels.sections.findOne({'courseNum':courseNum},function(err,results){
        if(err) throw err;
        if(results == null){
            const newCourse=new whModels.sections({
                courseNum:courseNum,
                courseName:courseName,
                sections:[section]

            });
            newCourse.save()
                .then(()=>console.log('Section created'));
            
        }
        else{
            //console.log('Query exists, updating');
            //console.log(results);
            let newSections;
            let oldSections = results.sections;
            // console.log(oldSections);
            let existed = false;
            for (i in oldSections) {
                s = oldSections[i];
                // console.log(s.secYear);
                if(year==s.secYear && semester==s.secSem) {
                    existed = true;
                    break;
                } 
            }
            if (!existed) {
                newSections=oldSections.push(section);
            }
            
            //const newStatus=status;
            //updating, this part isn't working correctly !!!
            results.save({
                sections:newSections
                // courseSizes:newCourseSizes,
                // waitlistSizes:newWaitlistSizes,
                // lectureTimes:newLectureTimes,
                // lectureLocations:newLectureLocations,
                // instructors:newInstructors,
                // status:newStatuses

            });
        }

        //console.log(results);
    });
    mongoose.disconnect();
};

//method for finding a query
//in the router there is an example for how to use this!!
const mongoGetCourses=async(mongoURL,courseNum)=>{
    await mongoose.connect(mongoURL,{useNewUrlParser:true,useUnifiedTopology:true});
    
    let ret;
    //if specified courseNum
    if(courseNum){
        ret=await whModels.courses.find({'courseNum':courseNum},function(err,results){
            if(err) throw err;
            
            return results;
            
        });
    }
    //if getting all courses
    else{
        ret=await whModels.courses.find({},function(err,results){
            if(err) throw err;
            
            return results;
            
        });
    }
    mongoose.disconnect();
    //console.log(ret);
    return ret;
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
    let val=mongoGetCourses(courseURL).then(val=>{
        console.log(val);
    });
    
    
    
    res.send('mongo_router');

});

module.exports={
    mongoScript,
    mongoSaveUserHistory:mongoSaveUserHistory,
    mongoInsertAccount:mongoInsertAccount,
    mongoSaveCourses: mongoSaveCourses,
    mongoGetCourses:mongoGetCourses,
    mongoSaveSections:mongoSaveSections,
    router:router
}