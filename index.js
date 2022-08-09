require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Scdhule = require('./models/schdules')
const Daily = require("./models/daily")
const Students = require("./models/student")
const cors = require('cors')
const apiHandler = require('./controller/api')

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


app.use(express.static('build'))
app.use(cors())
app.use('/api', apiHandler)

app.get("/",async (req,res)=>{
    res.render('index',{eachDaySchdule, studentsData,dataArr});
})


app.listen(process.env.PORT, () => console.log("Server Listenig on Port: ",process.env.PORT))
