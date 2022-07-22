const mongoose = require('mongoose')

const schdule = new mongoose.Schema(
    {class: String,
        monday: {classes: [],occupancy: []},
        tuesday: {classes: [],occupancy: []},
        wednesday: {classes: [],occupancy: []},
        thursday: {classes: [],occupancy: []},
        friday: {classes: [],occupancy: []}
})
mongoose.model("Schdule",schdule)