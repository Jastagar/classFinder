require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Scdhule = require('./models/schdules')
const Daily = require("./models/daily")
const Students = require("./models/student")
const cors = require('cors')
const apiHandler = require('./controller/api')
const logic = require('./logic/script')

console.log(logic.studentsData)

app.use(express.static('build'))
app.use(cors())


app.use('/api', apiHandler)

app.get("/",async (req,res)=>{
    res.send('Nothing here Yet');
})


app.listen(process.env.PORT, () => console.log("Server Listenig on Port: ",process.env.PORT))
