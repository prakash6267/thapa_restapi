const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    phone:Number,
    gender:String,
    imagePath:String
})

module.exports = mongoose.model('student',studentSchema);