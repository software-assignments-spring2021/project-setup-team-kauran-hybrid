const mongoose=require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const express = require("express");
const router = express.Router();
const dotenv=require('dotenv');
const userAccounts=require('./mongoSchemas.js');
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
//this is for inserting user accounts
const mongoInsertAccount=async(mongoURL,username,password)=>{
    
    // console.log(user, pwd)
    await mongoose.connect(mongoURL,{useNewUrlParser:true,useUnifiedTopology:true});

    const exAcc = new userAccounts.userAccounts({username:username,password:password})
    await exAcc.save()
        .then(() => console.log('account saved'));


    mongoose.disconnect();

};
//this is for inserting user search history
const mongoInsertUserHistory=async(mongoURL,username,courseNum,waitlistPos)=>{

};

//this is for inserting classes from albert
const mongoInsertCourses=async(mongoURL,courseNum,waitlistSize,waitlistPos)=>{

};


//post request for inserting user accounts
router.post("/add_user_account", async(req, res) => {
    const uri = `mongodb+srv://${user}:${pwd}@clusterwh.bhiht.mongodb.net/user_accounts?retryWrites=true&w=majority`;
    mongoInsertAccount(uri,req.body.username,req.body.password);
});

router.get("/",(req,res)=>{

    const uri = `mongodb+srv://${user}:${pwd}@clusterwh.bhiht.mongodb.net/user_accounts?retryWrites=true&w=majority`;
    // mongoInsertAccount(uri);
    
    res.send('mongo_router');

});

module.exports={
    mongoScript,
    router:router
}