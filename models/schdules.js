const mongoose = require('mongoose')

const schdule = new mongoose.Schema(
    {class: String,
        monday: {classes: [],occupancy: []},
        tuesday: {classes: [],occupancy: []},
        wednesday: {classes: [],occupancy: []},
        thursday: {classes: [],occupancy: []},
        friday: {classes: [],occupancy: []}
})

schdule.set("toJSON",{
    transform:(document,returnedObject)=>{
        delete returnedObject._id
    }
})


module.exports = mongoose.model("Schdule",schdule)