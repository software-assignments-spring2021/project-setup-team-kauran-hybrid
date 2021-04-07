const mongoose=require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const express = require("express");
const router = express.Router();
const dotenv=require('dotenv');
dotenv.config();

const pwd=process.env.mongoPWD;
const user=process.env.mongoUSER;
let bodyParser = require('body-parser');
// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: true }));

//copy pasted from mongoDB
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

const mongoInsert=async(mongoURL)=>{
    
    // console.log(user, pwd)
    await mongoose.connect(mongoURL, function(err) {
        if(err) throw err;
        
    })

    let userAccountSchema = new mongoose.Schema({
        username: String,
        password: String
    });

    const Account = mongoose.model('Account', userAccountSchema)
    const exAcc = new Account ({username: 'abc', password: 'def'})
    await exAcc.save()
        .then(() => console.log('account saved'))
        // .then(() => mongoose.disconnect())

    // need to figure out how to allow all saves to execute before disconnect
    // mongoose.disconnect()

};

// router.get("/add_user_account", (req, res) => {
//     res.send("add user account");
// });

// router.post("/add_user_account", async(req, res) => {
//     const mongoURL = `mongodb+srv://${user}:${pwd}@clusterwh.bhiht.mongodb.net/user_accounts?retryWrites=true&w=majority`;
// });

router.get("/",(req,res)=>{

    const uri = `mongodb+srv://whDev:${pwd}@clusterwh.bhiht.mongodb.net/user_accounts?retryWrites=true&w=majority`;
    mongoInsert(uri);
    
    res.send('mongo_router');

});

module.exports={
    mongoScript,
    router:router
}