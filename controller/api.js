const apiHandler = require('express').Router()
const Scdhule = require('../models/schdules')
const Daily = require("../models/daily")
const Students = require("../models/student")

apiHandler.get("/classDatabase",(req,res)=>{
    Scdhule.find({}).then((e)=>{
        res.json(e).status(200)
    })
})
apiHandler.get("/dailyDatabase",(req,res)=>{
    Daily.find({}).then((e)=>{
        res.json(e).status(200)
    })
})
apiHandler.get("/studentsDatabase",(req,res)=>{
    Students.find({}).then((e)=>{
        res.json(e).status(200)
    })
})

module.exports = apiHandler