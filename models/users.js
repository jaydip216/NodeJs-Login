const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    email:String,
    username:String,
    password:String
});

module.exports=mongoose.model('users',userSchema);