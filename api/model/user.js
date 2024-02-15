const mongoose = require('mongoose')

userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    username:String,
    password:String,
    phone:Number,
    userType:String
})
//ghgfhgf
module.exports = mongoose.model('user',userSchema)