const mongoose = require('mongoose')

async function connectToMongoose(){
    await mongoose.connect(process.env.DATABASE_URL).then(async ()=>{
        console.log("Connected to Database on Mongo")
        // dataArr = dataArr.sort((a,b)=>{
        //     return (a.class.slice(1) - b.class.slice(1))
        // })
    }).catch((err)=>{
        console.log("\nError Connecting to the DataBase:\n\n\n",err)
    })
}

async function closeConnection(){
    await mongoose.connection.close()
    console.log('connection Closed')
}

module.exports = { connectToMongoose, closeConnection}