const mongoose = require('mongoose')

const eachQuery = new mongoose.Schema({
    classes: Array,
    index:Number
})

eachQuery.set("toJSON",{
    transform:(document,returnedObject)=>{
        delete returnedObject._id
    }
})


module.exports = mongoose.model("Daily",eachQuery)