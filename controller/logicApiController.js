const logicApiController = require('express').Router()
const logicalFunctions = require('../logic/script')
const Students = require("../models/student")

var result = 'No button pressed yet'
var dayToday=0
var secNow=0


async function singleStudentFind(found){
    var studentsClassInfo
    if(logicalFunctions.getNowPeriod(secNow)){
        const classData = await logicalFunctions.getQuery(dayToday,logicalFunctions.getNowPeriod(secNow))
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

async function optimizedStudentFind(queryRL,queryN,querySurname){
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
        const nameRegx = querySurname? new RegExp(`${' '+queryN}`,"gi"):new RegExp(`^${queryN}`,"gi")
        const found = await Students.find({name:nameRegx})
        if(found.length === 1){
            return singleStudentFind(found[0])
        }else if(found.length>1){
            const mappedFound = found.map((e)=>{
                return [e.name,e.rollnumber,e.group]
            })
            return ['userM','Be more specific with the name or use Rollnumber',found.length,...mappedFound]
        }else{
            return ['err',"Please Check the Name again"]
        }
    }
}

async function handleQuickFind(){
    if(!logicalFunctions.getNowPeriod(secNow)){
        return ['err','You are not in Working Hour']
    }else{
        return await logicalFunctions.getOccupiedClasses(dayToday,logicalFunctions.getNowPeriod(secNow),dayToday)
    }
}

async function handleQuickFindForNext(){
    return await logicalFunctions.getOccupiedClasses(dayToday,`${parseInt(logicalFunctions.getNowPeriod(secNow))+1}`,dayToday)
}

async function handleGettingOccupiedClasses(day,period){
    var dayQuery = day
    const periodValue = period
    if(dayQuery==="today"){dayQuery=dayToday}
    return await logicalFunctions.getOccupiedClasses(dayQuery,periodValue,dayToday)
}

logicApiController.get("/:secnow/:daytoday/quick",async (req,res)=>{
    dayToday = parseInt(req.params.daytoday)
    secNow = parseInt(req.params.secnow)
    console.log(dayToday)
    console.log(secNow)
    result = await handleQuickFind()
    res.json(result)
})
logicApiController.get("/:secnow/:daytoday/student/:student",async (req,res)=>{
    dayToday = parseInt(req.params.daytoday)
    secNow = parseInt(req.params.secnow)
    const queryType = req.params.student
    queryType.slice(0,5)==='20109'? result = await optimizedStudentFind(queryType,'',false):result = await optimizedStudentFind('',queryType,false)
    res.json(result)
})
logicApiController.get("/:secnow/:daytoday/student/:student/1",async (req,res)=>{
    dayToday = parseInt(req.params.daytoday)
    secNow = parseInt(req.params.secnow)
    const queryType = req.params.student
    queryType.slice(0,5)==='20109'? result = await optimizedStudentFind(queryType,'',true):result = await optimizedStudentFind('',queryType,true)
    res.json(result)
})
logicApiController.get("/:secnow/:daytoday/quicknext",async (req,res)=>{
    dayToday = parseInt(req.params.daytoday)
    secNow = parseInt(req.params.secnow)
    result = await handleQuickFindForNext()
    res.json(result)
})
logicApiController.get("/:secnow/:daytoday/find/:day/:period",async (req,res)=>{
    dayToday = parseInt(req.params.daytoday)
    secNow = parseInt(req.params.secnow)
    console.log("Req recieved here")
    result = await handleGettingOccupiedClasses(req.params.day,req.params.period)
    res.json(result)
})



module.exports = logicApiController