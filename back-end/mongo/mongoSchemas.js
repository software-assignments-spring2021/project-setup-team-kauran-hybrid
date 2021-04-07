const mongoose=require('mongoose');

const userAccountSchema = new mongoose.Schema({
    username: String,
    password: String
});
const userAccounts=mongoose.model("userAccounts",userAccountSchema)
module.exports={userAccounts:userAccounts}
