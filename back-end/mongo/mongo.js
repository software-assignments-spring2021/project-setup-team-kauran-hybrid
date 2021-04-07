const mongoose=require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const express = require("express");
const router = express.Router();

const pwd=process.env.mongoPWD;
const user=process.env.mongoUSER;
let bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//copy pasted from mongoDB
const mongoScript=async()=>{

    const uri = `mongodb+srv://${user}:${pwd}@clusterwh.bhiht.mongodb.net/sample_airbnb?retryWrites=true&w=majority`;
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

mongoose.Promise = global.Promise;

const mongoInsert=async(mongoURL)=>{
    
    mongoose.connect(mongoURL)
        .catch(err => {
            res.status(400).send("unable to connect to database");
        })

};

let userAccountSchema = new mongoose.Schema({
    username: String,
    password: String
});

let User = mongoose.model("User", userAccountSchema);

router.get("/add_user_account", (req, res) => {
    res.send("add user account");
});

router.post("/add_user_account", (req, res) => {
    let myUser = new User(req.body);
    myUser.save()
        .then(item => {
            res.send("item saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        })
});

router.get("/",(req,res)=>{

    const uri = `mongodb+srv://${user}:${pwd}@clusterwh.bhiht.mongodb.net/sample_airbnb?retryWrites=true&w=majority`;
    mongoInsert(uri);

    res.send('mongo_router');

});

module.exports={
    mongoScript,
    router:router
}