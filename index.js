require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const apiHandler = require('./controller/api')
const logicApiController = require('./controller/logicApiController')
const Mongo = require('./mongoose/mongooseConnection')

Mongo.connectToMongoose()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

app.use('/api', apiHandler)
app.use('/search', logicApiController)

app.get("/",async (req,res)=>{
    res.send('Nothing here Yet');
})

app.listen(process.env.PORT, () => console.log("Server Listenig on Port: ",process.env.PORT))
