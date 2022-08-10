const logicApiController = require('express').Router()
const logicalFunctions = require('../logic/script')

var result = 'No button pressed yet'

function handleQuickFind(){
    console.log('running Quick find')
    if(!logicalFunctions.getNowPeriod()){
        result= ['err','You are not in Working Hour']
        return result
    }
    const res = logicalFunctions.getOccupiedClasses(logicalFunctions.dayToday,logicalFunctions.getNowPeriod())
    result=res
    return [[((logicalFunctions.dayToday-1)*9),parseInt(logicalFunctions.getNowPeriod())]]
}
function handleStudentFind(queryRollnumber,queryName){
    const queryRL = queryRollnumber
    const queryN = queryName
    if((!queryRL || queryRL==="201099") && !queryN) {
        result=['err',"Koi number ya naam toh daal do phele :|"]
        return false
    }
    if(queryRL!=="201099" || !queryRL){
        const found = studentsData.find((each)=>{
            return each.rollnumber === queryRL
        })
        if(found){
            var studentsClassInfo
            if(getNowPeriod()){
                const classData = getQuery(dayToday,getNowPeriod())
                const groupRex = new RegExp(found.group,"i")
                studentsClassInfo = classData.find((each)=>{
                    const ret = each.match(groupRex)
                    return ret
                })
            }
            if(!studentsClassInfo){
                result = ['user0',found.name,found.rollnumber,found.group]
                return false
            }
            var [group,subject,classNumber,FCnumber] = studentsClassInfo.split("-")
            result= ['user1',found.name,found.rollnumber,found.group,officialNamesForSubjects[subject][0],classNumber,FCnumber]
            return false
        }else{
            result = ['err',"Please Check the number again"]
        }
    }else{
        const nameRegx = new RegExp(`^${queryN}`,"gi")
        const serNameRegx = new RegExp(`${' '+queryN}`,"gi")
        const found = studentsData.filter((each)=>{
            if(each.name.toLowerCase().match(nameRegx) || each.name.toLowerCase().match(serNameRegx)){return each}
        })
        if(found.length === 1){
            const singleFound = found[0]
            var studentsClassInfo
            if(getNowPeriod()){
                const classData = getQuery(dayToday,getNowPeriod())
                const groupRex = new RegExp(singleFound.group,"i")
                studentsClassInfo = classData.find((each)=>{
                    const ret = each.match(groupRex)
                    return ret
                })
            }
            if(!studentsClassInfo){
                result = ['user0',singleFound.name,singleFound.rollnumber,singleFound.group]
                return false
            }
            var [group,subject,classNumber,FCnumber] = studentsClassInfo.split("-")
            result= ['user1',singleFound.name,singleFound.rollnumber,singleFound.group,officialNamesForSubjects[subject][0],classNumber,FCnumber]
            return false
        }else if(found.length>1){
            var allNames = []
            found.forEach((each)=>{
                allNames.push(`<b>${each.name}</b> rollnumber <b>${each.rollnumber}</b> from <b>${each.group}</b><br><hr>`)
            })
            result = ['userM',found.length,...allNames]
        }else{
            result = ['err',"Please Check the Name again"]
        }
    }
}
function handleQuickFindForNext(){
    const period = handleQuickFind()[1]+1
    const dayNumber = handleQuickFind()[0]+1
    const nextQuery = getOccupiedClasses(dayToday,`${period}`)
    result = nextQuery
}
function handleGettingOccupiedClasses(){
    if(days[dayToday] === "Sunday"){
        result = ['err',`Its Sunday, no classes today :)`]
        return
    }
    else if(days[dayToday] === "saturday"){
        result = ['err',`Its Sunday, no classes today :)`]
        return
    }
    var dayQuery = document.querySelector("#dayQuery").value
    const periodValue = document.getElementById("inputQuery").value
    if(dayQuery==="today"){dayQuery=dayToday}
    const res = getOccupiedClasses(dayQuery,periodValue)
    result(res)
}

setTimeout(handleQuickFind,1000)

logicApiController.get("/specific-student",(req,res)=>{
    
    res.json(logicalFunctions.studentsData)
})



module.exports = logicApiController