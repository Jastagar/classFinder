require('dotenv').config()
const express = require('express')
const app = express()
const fs = require("fs")
const mongoose = require('mongoose')
const Scdhule = require('./models/schdules')
const Daily = require("./models/daily")
const Students = require("./models/student")

mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log("Connected to Database on Mongo")
}).catch((err)=>{
    console.log("Error here:",err)
})



app.set('view engine',"ejs")
app.use(express.static("public"))


app.get("/schdule",(req,res)=>{
    Scdhule.find({}).then((e)=>{
        res.render('schdule',{dataArr:e})
    })
})
app.get("/",(req,res)=>{
    var eachDaySchdule = []
    Students.find({}).then((e)=>{
        const studentsData = JSON.stringify(e) 
        res.render("index",{eachDaySchdule,studentsData})
    })
    Daily.find({}).then((e)=>{
        eachDaySchdule = JSON.stringify(e)
    })
})


app.listen(process.env.PORT,()=>{console.log("Server Listenig on Port: ",process.env.PORT)})
