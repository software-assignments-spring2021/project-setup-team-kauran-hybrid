const mongoose=require('mongoose');

const userAccountSchema = new mongoose.Schema({
        username: String,
        password: String
    });
module.exports=mongoose.model("userAccounts",userAccountSchema)
