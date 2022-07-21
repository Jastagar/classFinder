require('dotenv').config()
const express = require('express')
const app = express()
const axios = require("axios")
const mongo = require('mongoose')

console.log(process.env.DATABASE_URL)

mongo.connect(process.env.DATABASE_URL).then((res)=>{
    
    console.log("Connected");
    console.log(res);
}).catch((err)=>{
    console.log("Error",err);
})



app.set('view engine',"ejs")
app.use(express.static("public"))

// const {readFileSync} = require('fs');

var dataArr = []

// axios.get("http://localhost:3009/schdule").then((res)=>{
//   console.log("data ready")
//   dataArr = res.data
// }).catch((err)=>{console.log(err);})

// function syncReadFile(filename) {
//   const contents = readFileSync(filename, 'utf-8');

//   const arr = contents.split(/\r?\n/);

//   for(let i=0;i<264;i+=11){
//     var dataValue = {
//       class:arr[i],
//       monday:{
//         classes:arr[i+1].split(" "),
//         occupancy:arr[i+2].split(" ")
//       },
//       tuesday:{
//         classes:arr[i+3].split(" "),
//         occupancy:arr[i+4].split(" ")
//       },
//       wednesday:{
//         classes:arr[i+5].split(" "),
//         occupancy:arr[i+6].split(" ")
//       },
//       thursday:{
//         classes:arr[i+7].split(" "),
//         occupancy:arr[i+8].split(" ")
//       },
//       friday:{
//         classes:arr[i+9].split(" "),
//         occupancy:arr[i+10].split(" ")
//       },
//     }
//     dataArr.push(dataValue)
//   }
//   return contents;

// }
// dataArr = JSON.stringify(dataArr)
app.get("/schdule",(req,res)=>{
    // const data = syncReadFile('./dataForClassFinder.txt');
    res.render('schdule',{dataArr})
})
app.get("/",(req,res)=>{
    res.render("index")
})


app.listen(3000,()=>{
    console.log("Server running at 3000")
})
