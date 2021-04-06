const mongoose=require('mongoose');
const MongoClient = require('mongodb').MongoClient;

const pwd=process.env.mongoPWD;
const user=process.env.mongoUSER;
//copy pasted from mongoDB
const mongoScript=async()=>{

    const uri = `mongodb+srv://whDev:${pwd}@clusterwh.bhiht.mongodb.net/sample_airbnb?retryWrites=true&w=majority`;
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
const mongoInster=async(mongoURL)=>{
    
};

module.exports={mongoScript}