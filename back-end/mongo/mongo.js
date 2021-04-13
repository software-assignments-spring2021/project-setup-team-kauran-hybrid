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
    const link = await mongoose.createConnection(mongoURL,{useNewUrlParser:true,useUnifiedTopology:true});
    const userAccounts = link.model('userAccounts', whModels.userAccountSchema);

    const exAcc = new userAccounts({username:username,password:password})
    await exAcc.save()
        .then(() => console.log('account created'));


    // mongoose.disconnect();

};
//this is for updating user history OR creating user account along side search history
const mongoSaveUserHistory=async(mongoURL,username,password,courseNum,waitlistPos)=>{
    const link = await mongoose.createConnection(mongoURL,{useNewUrlParser:true,useUnifiedTopology:true});
    const userAccounts = link.model('userAccounts', whModels.userAccountSchema);
    //find the correct userAccount
    await userAccounts.findOne({'username':username},function(err,results){
        if(err) throw err;
        if(results==null){
            const newCourseNum=[courseNum];
            const newWaitlistPos=[waitlistPos];
            const exAcc = new userAccounts({
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
    // mongoose.disconnect();
    
};

//this is for creating OR updating classes from albert
const mongoSaveCourses=async(mongoURL,courseNum,courseName,courseSize,waitlistSize,droppedSize,sizeCap,status)=>{
    const link = await mongoose.createConnection(mongoURL,{useNewUrlParser:true,useUnifiedTopology:true});
    const courses = link.model('courses', whModels.courseSchema)
    //find the course if it exists
    await courses.findOne({'courseNum':courseNum},function(err,results){
        if(err) throw err;
        if(results == null){
            const newCourse=new courses({
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
    const link = await mongoose.createConnection(mongoURL,{useNewUrlParser:true,useUnifiedTopology:true});
    const sections = link.model('sections', whModels.sectionSchema)
    //find the course if it exists
    await sections.findOne({'courseNum':courseNum},function(err,results){
        if(err) throw err;
        if(results == null){
            const newCourse=new sections({
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
            let s;
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

            });
        }

        //console.log(results);
    });
    // mongoose.disconnect();
};

//method for finding a query
//in the router there is an example for how to use this!!
const mongoGetCourses=async(mongoURL,courseNum)=>{
    const link = await mongoose.createConnection(mongoURL,{useNewUrlParser:true,useUnifiedTopology:true});
    const courses = link.model('courses', whModels.courseSchema)
    let ret;
    //if specified courseNum
    if(courseNum){
        ret=await courses.find({'courseNum':courseNum},function(err,results){
            if(err) throw err;
            
            return results;
            
        });
    }
    //if getting all courses
    else{
        ret=await courses.find({},function(err,results){
            if(err) throw err;
            
            return results;
            
        });
    }
    // mongoose.disconnect();
    //console.log(ret);
    return ret;
};

const mongoGetSections=async(mongoURL,courseNum,secCode)=>{
    const link = await mongoose.createConnection(mongoURL,{useNewUrlParser:true,useUnifiedTopology:true});
    const sections = link.model('sections', whModels.sectionSchema)
    let record;
    let ret;
    //if specified courseNum
    if(courseNum && secCode){
        record=await sections.findOne({'courseNum':courseNum},function(err,results){
            if(err) throw err;
            
            return results;
            
        });
        let s;
        for (i in record.sections) {
            s=record.sections[i];
            if (s.secCode == secCode) {
                ret = s;
                break;
            }
        }
    }
    //if getting all courses
    else if (courseNum){
        ret=await sections.find({'courseNum':courseNum},function(err,results){
            if(err) throw err;
            
            return results;
            
        });
    }
    else{
        ret=await sections.find({},function(err,results){
            if(err) throw err;
            
            return results;
            
        });
    }
    
    // mongoose.disconnect();
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
    // console.log(user)
    const userURL = `mongodb+srv://${user}:${pwd}@clusterwh.bhiht.mongodb.net/user_accounts?retryWrites=true&w=majority`;
    const courseURL = `mongodb+srv://${user}:${pwd}@clusterwh.bhiht.mongodb.net/albert?retryWrites=true&w=majority`;
    mongoSaveUserHistory(userURL,'sp',789,'Cyber',888);
    mongoSaveSections(courseURL, '1234567', 'ExampleCourseName', ['1','2','3','4'])
    mongoSaveCourses(courseURL,'Cyber',100,20);
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
    mongoGetSections:mongoGetSections,
    router:router
}