const mongoose = require('mongoose')

const eachQuery = new mongoose.Schema({})

eachQuery.set("toJSON",{
    transform:(document,returnedObject)=>{
        delete returnedObject._id
    }
})


module.exports = mongoose.model("Daily",eachQuery)