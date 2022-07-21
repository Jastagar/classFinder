require('dotenv').config()
const express = require('express')
const app = express()
const axios = require("axios")
const mongo = require('mongoose')

console.log(process.env.DATABASE_URL)

mongo.connect(process.env.DATABASE_URL).then((res)=>{
    const something = res.Collection("3rd-year-schdule")
    console.log(something);
    console.log("Connected");
}).catch((err)=>{
    console.log("Error",err);
})



app.set('view engine',"ejs")
app.use(express.static("public"))

// const {readFileSync} = require('fs');

var dataArr = []

app.get("/schdule",(req,res)=>{
    res.render('schdule',{dataArr})
})
app.get("/",(req,res)=>{
    res.render("index")
})


app.listen(3000,()=>{
    console.log("Server running at 3000")
})
