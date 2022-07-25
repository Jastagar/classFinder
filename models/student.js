const mongoose = require('mongoose')

const eachStudent = new mongoose.Schema({
    rollnumber:String,
    name:String,
    group:String,
    businessClassGroup:String
})

eachStudent.set("toJSON",{
    transform:(document,returnedObject)=>{
        delete returnedObject._id
    }
})


module.exports = mongoose.model("Students",eachStudent)