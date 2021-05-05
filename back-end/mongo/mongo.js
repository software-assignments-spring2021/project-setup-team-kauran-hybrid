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
const mongoDeleteUserHistory=async(username,index)=>{
    const userAccounts = whModels.userAccounts;
    //find the correct userAccount
    await userAccounts.findOne({'username':username},function(err,results){
        if(err) throw err;
        if(results==null){
            return null;
        }
        else{
            console.log('Query exists, updating');
            let newUserHistory=[];
            let removed=false;
            for (records in results.userHistory){
                record=results.userHistory[records]
                //console.log('record',record);
                if(record&&record.index!=index){
                    if(!removed){
                        
                        newUserHistory.push(record);
                    }
                    else{
                        const curr={
                            index:record.index-1,
                            waitlistPos:record.waitlistPos,
                            courseNum:record.courseNum,
                            secCode:record.secCode
                        }
                        //console.log(curr);
                        newUserHistory.push(curr);
                    }
                }
                else if(record&&record.index==index){
                    removed=true;
                }
            }
            console.log(newUserHistory);
            results.userHistory=newUserHistory;
            results.markModified('userHistory');
            results.save({
                username:username,
                userHistory:newUserHistory
            });
        }
        console.log('record removed');
    }); 
    
}
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

const mongoSaveNewSection=async(courseNum,courseName,secCode,secYear,secSem,secInstructors,secStatus,secTime,secLoc,recs)=>{

    await whModels.newSection.findOne({'courseNum':courseNum,'secCode':secCode},function(err,result){
        if(err) throw err;
        if(result==null){
            console.log(result);
            const newCourse=new whModels.newSection({
                courseNum:courseNum,
                courseName:courseName,
                secCode:secCode,
                secYear:secYear,
                secSem:secSem,
                secInstructors:secInstructors,
                secStatus:secStatus,
                secTime:secTime,
                secLoc:secLoc,
                recs:recs
            });
            newCourse.save()
                .then(()=>console.log('Section created'));
        }
        // else{
        //     //console.log('Query exists, updating');
        //     //console.log(results);
        //     let newSections;
        //     let oldSections = results.sections;
        //     // console.log(oldSections);
        //     let existed = false;
        //     let s;
        //     for (i in oldSections) {
        //         s = oldSections[i];
        //         // console.log(s.secYear);
        //         if(section.secYear==s.secYear && section.secSem==s.secSem && section.secCode==s.secCode) {
        //             existed = true;
        //             break;
        //         } 
        //     }
        //     if (!existed) {
        //         newSections=oldSections.push(section);
        //     }
        //     //const newStatus=status;
        //     //updating, this part isn't working correctly !!!
        //     results.save({
        //         sections:newSections
        //     });
        // }
        //console.log(results);
    });

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
    console.log(courseNum,secCode)
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
    let re = / [a-zA-Z]\.* /i;
    for (i in records) {
        if (records[i].sections) {
            
            secs = records[i].sections;
            
            for (j in secs) {
                sec = secs[j];
                if (sec.secInstructors) {

                
                    for (k in sec.secInstructors) {
                        sec.courseName = records[i].courseName;
                        sec.courseNum = records[i].courseNum;
                        prof = sec.secInstructors[k];
                        prof = prof.replace(re, ' ');
                        await saveProfs(prof, sec);
                    }
                }
            }
        }
    }
    

    console.log(ret);
    return ret;
};

const mongoGetProfs2=async()=>{
    const professors = whModels.professors;

    const ret=await professors.find({},function(err,results){
        if(err) throw err;
        
        return results;
        
    }).distinct('_id');

    console.log(ret);
    return ret;
};

const mongoSaveProfsRate=async(profName,rate,difficulty,retake,tags)=>{

    let result = await whModels.professors.findById(profName);
    if (rate) {
        result.rate = rate;
    }
    if (difficulty) {
        result.difficulty = difficulty;
    }
    if (retake) {
        result.retake = retake;
    }
    if (tags) {
        result.tags = tags;
    }
    
    await result.save();

};


const mongoGetNewSection=async(courseNum,secCode)=>{
    console.log(courseNum,secCode)
    const newSection = whModels.newSection;
    let record;
    let ret;
    //if specified courseNum
    if(courseNum && secCode){
        record=await newSection.findOne({'courseNum':courseNum,'secCode':secCode},function(err,result){
            if(err) throw err;
            return result;
        });
        ret=record;
        // console.log(ret)
        // let s;
        // for (i in record.sections) {
        //      s=record.sections[i];
        //      if (s.secCode == secCode) {
        //          ret = s;
        //          break;
        //     }
        // }
    }
    //if getting all courses
    else if (courseNum){
        ret=await newSection.find({'courseNum':courseNum},function(err,result){
            if(err) throw err;
            
            return result;
            
        });
    }
    else{
        ret=await newSection.find({},function(err,result){
            if(err) throw err;
            
            return result;
            
        });
    }
    return ret;
}

const mongoGetRecSection=async(courseNum,secCode)=>{
    // console.log(courseNum,secCode)
    const newSection = whModels.newSection;
    // let record;
    let ret;
    //if specified courseNum
    if(courseNum && secCode){
        ret=await newSection.find({ 'courseNum': { $gte: courseNum } , 'secCode': { $ne: secCode }, $or:[ {'secStatus':'Open'}, {'secStatus':'WaitList'}]},function(err,result){
            if(err) throw err;
            return result;
        });
        
        // console.log(ret)
        // let s;
        // for (i in record.sections) {
        //      s=record.sections[i];
        //      if (s.secCode == secCode) {
        //          ret = s;
        //          break;
        //     }
        // }
    }
    console.log(ret);
    return ret;
}

const mongoGetProfRate=async(profName)=>{
    const professors = whModels.professors;
    let ret;

    ret = await professors.findById(profName);

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
router.get('/delete',(req,res)=>{
    let {index,username}=req.query
    mongoDeleteUserHistory(username,index);
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
    mongoGetProfs2:mongoGetProfs2,
    mongoSaveProfsRate:mongoSaveProfsRate,
    mongoSaveNewSection:mongoSaveNewSection,
    mongoGetNewSection:mongoGetNewSection,
    mongoGetProfRate:mongoGetProfRate,
    mongoDeleteUserHistory:mongoDeleteUserHistory,
    mongoGetRecSection:mongoGetRecSection,
    router:router
}