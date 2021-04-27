const mongoose=require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const express = require("express");
const router = express.Router();
// const app=require('../app.js')
const whModels=require('./wh_models.js');

let bodyParser = require('body-parser');


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
const mongoInsertAccount=async(username,password)=>{
    const exAcc = new whModels.userAccounts({username:username,password:password})
    await exAcc.save()
        .then(() => console.log('account created'));

};
//this is for updating user history OR creating user account along side search history
const mongoSaveUserHistory=async(username,password,userHistory)=>{
    
    const userAccounts = whModels.userAccounts;
    //find the correct userAccount
    await userAccounts.findOne({'username':username},function(err,results){
        if(err) throw err;
        if(results==null){
            // const newCourseNum=[courseNum];
            // const newWaitlistPos=[waitlistPos];
            const exAcc = new userAccounts({
                username:username,
                password:password,
                userHistory:userHistory
            });
            exAcc.save()
                .then(()=>console.log('Account created'));
            results=exAcc;
        }
        else{
            console.log('Query exists, updating');
            // const newCourseNum=results.courseNum.push(courseNum);
            // const newWaitlistPos=results.waitlistPos.push(waitlistPos);
            const newUserHistory=results.userHistory.push(userHistory);
            //update the account with the new parameters
            results.save({
                username:username,
                password:password,
                userHistory:newUserHistory
            });
        }
        
        console.log(results);
    });

    
};

//this is for creating OR updating classes from albert
const mongoSaveCourses=async(courseNum,courseName,courseSize,waitlistSize,droppedSize,sizeCap)=>{
    const courses=whModels.courses;
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
                // statuses:[status]

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
            // let newStatuses;
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

            // if (status) {
            //     newStatuses=results.statuses.push(status);
            // }

            //const newStatus=status;
            //updating, this part isn't working correctly !!!
            results.save({
                sizeCaps:newSizeCaps,
                courseSizes:newCourseSizes,
                waitlistSizes:newWaitlistSizes,
                droppedSizes:newDroppedSizes,
                // status:newStatuses

            });
        }

        //console.log(results);
    });

};

//this is for creating OR updating classes from albert
const mongoSaveSections=async(courseNum,courseName,section)=>{

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
            let s;
            for (i in oldSections) {
                s = oldSections[i];
                // console.log(s.secYear);
                if(section.secYear==s.secYear && section.secSem==s.secSem && section.secCode==s.secCode) {
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

};

//this is for creating OR updating classes from albert
const mongoSaveProfs=async(profName,section)=>{

    let result = await whModels.professors.findById(profName);
    if (result==null){
        result = new whModels.professors({
                        _id:profName,
                        sections:[section]
        
                    });
    }
    else {
        result.sections.push(section);
    }
    await result.save();
    // await whModels.professors.findById(profName,async function(err,results){
    //     if(err) throw err;
    //     if(results == null){
    //         const newCourse=new whModels.professors({
    //             _id:profName,
    //             sections:[section]

    //         });
    //         await newCourse.save()
    //             .then(()=>console.log('Professor created'));
            
    //     }
        
    //     else {
    //         results.sections.push(section);
    //         await results.save().then(()=>console.log('Professor updated'));
    //     }

        // console.log(results);
    // });
    
    
     

};

// method for getting User History
const mongoGetUserHistory=async(username,password,courseNum,waitlistPos)=>{
    let ret;
    const userAccounts = whModels.userAccounts;
    //find the correct userAccount
    ret = await userAccounts.find({'username':username},function(err,results){
        if(err) throw err;
        return results;
    });
    return ret;
    
};

//method for finding a query
//in the router there is an example for how to use this!!
const mongoGetCourses=async(courseNum)=>{
   
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

    //console.log(ret);
    return ret;
};

const mongoGetSections=async(courseNum,secCode)=>{
    const sections = whModels.sections;
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
                s.lecName = record.courseName;
                s.lecNum = courseNum;
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
    

    //console.log(ret);
    return ret;
};

const mongoGetProfs=async(saveProfs)=>{
    const sections = whModels.sections;
    let records;
    let ret={};

    records=await sections.find({},function(err,results){
        if(err) throw err;
        
        return results;
        
    });

    let secs;
    let sec;
    let prof;
    for (i in records) {
        if (records[i].sections) {
            
            secs = records[i].sections;
            
            for (j in secs) {
                sec = secs[j];
                if (sec.secInstructors) {

                
                    for (k in sec.secInstructors) {
                        sec.courseName = records[i].courseName;
                        sec.courseNum = records[i].courseNum;
                        await saveProfs(sec.secInstructors[k], sec);
                    }
                }
            }
        }
    }
    

    console.log(ret);
    return ret;
};


//post request for inserting user accounts
router.post("/add_user_account", async(req, res) => {
    const uri = `mongodb+srv://${user}:${pwd}@clusterwh.bhiht.mongodb.net/user_accounts?retryWrites=true&w=majority`;
    mongoInsertAccount(req.body.username,req.body.password);
});
router.post('/add_courses',async(req,res)=>{
    const uri=`mongodb+srv://${user}:${pwd}@clusterwh.bhiht.mongodb.net/albert?retryWrites=true&w=majority`;
    mongoSaveCourses(req.body.courseNum,req.body.courseSize,req.body.waitlistSize);
});

router.get("/",(req,res)=>{
    // console.log(user)
    //const userURL = `mongodb+srv://${user}:${pwd}@clusterwh.bhiht.mongodb.net/user_accounts?retryWrites=true&w=majority`;
    //const courseURL = `mongodb+srv://${user}:${pwd}@clusterwh.bhiht.mongodb.net/albert?retryWrites=true&w=majority`;
    // mongoGetProfs();
    // mongoSaveUserHistory('sp',789,'Cyber',888);
    // mongoSaveSections( '1234567', 'ExampleCourseName', ['1','2','3','4'])
    // mongoSaveCourses('Cyber',100,20);
    // let val=mongoGetProfs().then(val=>{
    //     console.log(val);
    // });
    mongoGetProfs(mongoSaveProfs);
    // mongoSaveProfs("C Sinan Gunturk", {secCode:5});
    console.log("ended");
    
    
    res.send('mongo_router');

});

module.exports={
    mongoScript,
    mongoSaveUserHistory:mongoSaveUserHistory,
    mongoInsertAccount:mongoInsertAccount,
    mongoSaveCourses: mongoSaveCourses,
    mongoGetUserHistory:mongoGetUserHistory,
    mongoGetCourses:mongoGetCourses,
    mongoSaveSections:mongoSaveSections,
    mongoGetSections:mongoGetSections,
    mongoGetProfs:mongoGetProfs,
    mongoSaveProfs:mongoSaveProfs,
    router:router
}