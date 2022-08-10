const mongoose = require('mongoose')
const Schdule = require('../models/schdules')
const Daily = require("../models/daily")
const Students = require("../models/student")

async function getData(){
    var dataArr;
    var eachDaySchdule;
    var studentsData;
    await mongoose.connect(process.env.DATABASE_URL).then(async ()=>{
        console.log("Connected to Database on Mongo")
        console.log("Assigning data...")
        dataArr = await Scdhule.find({});
        eachDaySchdule = await Daily.find({});
        studentsData = await Students.find({});
        console.log("Data Assigned")
        dataArr = dataArr.sort((a,b)=>{
            return (a.class.slice(1) - b.class.slice(1))
        })
    }).catch((err)=>{
        console.log("\nError Connecting to the DataBase:\n\n\n",err)
    })
}
getData()