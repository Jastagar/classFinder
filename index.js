require('dotenv').config()
const express = require('express')
const app = express()
const fs = require("fs")

const dataContent = fs.readFileSync("./data.json").toString()
const parsedData = JSON.parse(dataContent)

app.set('view engine',"ejs")
app.use(express.static("public"))


app.get("/schdule",(req,res)=>{
    res.render('schdule',{dataArr:parsedData})
})
app.get("/",(req,res)=>{
    res.render("index")
})


app.listen(process.env.PORT)
