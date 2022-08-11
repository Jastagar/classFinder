const logicApiController = require('express').Router()
const logicalFunctions = require('../logic/script')
const Schdule = require('../models/schdules')
const Daily = require("../models/daily")
const Students = require("../models/student")

var result = 'No button pressed yet'

async function singleStudentFind(found){
    var studentsClassInfo
    if(logicalFunctions.getNowPeriod()){
        const classData = await logicalFunctions.getQuery(logicalFunctions.dayToday,logicalFunctions.getNowPeriod())
        studentsClassInfo = classData.find((each)=>{
            return each[0]===found.group
        })
    }
    if(!studentsClassInfo){
        return ['user0',found.name,found.rollnumber,found.group]
    }
    const [,subject,classNumber,FCnumber] = studentsClassInfo
    return ['user1',found.name,found.rollnumber,found.group,logicalFunctions.officialNamesForSubjects[subject][0],classNumber,FCnumber]
}

async function optimizedStudentFind(queryRL,queryN){
    if((!queryRL || queryRL==="201099") && !queryN) {
        return ['err',"Koi number ya naam toh daal do phele :|"]
    }
    if(queryRL){
        const found = await Students.findOne({rollnumber:queryRL})
        if(found){
            return singleStudentFind(found)
        }else{
            return ['err',"Please Check the number again"]
        }
    }else{
        const nameRegx = new RegExp(`^${queryN}`,"gi")
        // const serNameRegx = new RegExp(`${' '+queryN}`,"gi")
        const found = await Students.find({name:nameRegx})
        if(found.length === 1){
            singleStudentFind(found[0])
        }else if(found.length>1){
            return ['userM',found.length,...found]
        }else{
            return ['err',"Please Check the Name again"]
        }
    }
}

async function handleQuickFind(){
    if(!logicalFunctions.getNowPeriod()){
        return ['err','You are not in Working Hour']
    }else{
        return await logicalFunctions.getOccupiedClasses(logicalFunctions.dayToday,logicalFunctions.getNowPeriod())
    }
}

async function handleQuickFindForNext(){
    return await logicalFunctions.getOccupiedClasses(logicalFunctions.dayToday,`${parseInt(logicalFunctions.getNowPeriod())+1}`)
}

async function handleGettingOccupiedClasses(day,period){
    var dayQuery = day
    const periodValue = period
    if(dayQuery==="today"){dayQuery=logicalFunctions.dayToday}
    return await logicalFunctions.getOccupiedClasses(dayQuery,periodValue)
}

logicApiController.get("/quick",async (req,res)=>{
    result = await handleQuickFind()
    res.json(result)
})
logicApiController.get("/student/:student",async (req,res)=>{
    const queryType = req.params.student
    queryType.slice(0,5)==='20109'? result = await optimizedStudentFind(queryType,''):result = await optimizedStudentFind('',queryType)
    res.json(result)
})
logicApiController.get("/quicknext",async (req,res)=>{
    result = await handleQuickFindForNext()
    res.json(result)
})
logicApiController.get("/find/:day/:period",async (req,res)=>{
    console.log("Req recieved here")
    result = await handleGettingOccupiedClasses(req.params.day,req.params.period)
    res.json(result)
})



module.exports = logicApiController