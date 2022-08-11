const Daily = require("../models/daily")

const days = ["Sunday","monday","tuesday","wednesday","thursday","friday","saturday"]
const allClassesEverUsed = ['311', '312', '318', '322', '323', '402', '409', '410', '411', '417', '420', '421', '501', '502', '509', '510', '511']
const officialNamesForSubjects = {
    nl:["NALR","Numerical Ability and Logical Reasonging"],
    pa:["PA","Programming Abstractions"],
    fd:["F& D","Frontend Web Development"],
}

const timeNow = new Date()
const secNow = timeNow.getHours()*3600 + timeNow.getMinutes()*60
var dayToday = new Date().getDay()
var defaultPeriod = false
var testing = false

// testingFunctionSetDay("5","5")

// function testingFunctionSetDay(day,period){
//     dayToday = day;
//     defaultPeriod = period; 
//     testing=true
// }
var USTimeDelay = 37800


function getNowPeriod() {
    if(testing){
        return defaultPeriod
    }
    if(secNow>=32400+USTimeDelay && secNow<35400+USTimeDelay) return '1'
    else if(secNow>=35400+USTimeDelay && secNow<38400+USTimeDelay) return '2'
    else if(secNow>=38400+USTimeDelay && secNow<41400+USTimeDelay) return '3'
    else if(secNow>=41400+USTimeDelay && secNow<44400+USTimeDelay) return '4'
    else if(secNow>=44400+USTimeDelay && secNow<47400+USTimeDelay) return '5'
    else if(secNow>=47400+USTimeDelay && secNow<50400+USTimeDelay) return '6'
    else if(secNow>=50400+USTimeDelay && secNow<53400+USTimeDelay) return '7'
    else if(secNow>=53400+USTimeDelay && secNow<56400+USTimeDelay) return '8'
    else if(secNow>=56400+USTimeDelay && secNow<59400+USTimeDelay) return '9'
    else return defaultPeriod
}
async function getQuery(day,period){
    const numberForQuery = ((day-1)*9) + parseInt(period)-1
    const eachDaySchdule = await Daily.findOne({index:numberForQuery})
    return eachDaySchdule['classes']
}
async function getOccupiedClasses(day,period){
    if(days[dayToday] === "Sunday"){
        return ['err',`Its Sunday, no classes today :)`]
    }
    else if(days[dayToday] === "saturday"){
        return ['err',`Its Saturday, no classes today :)`]
    }
    const numberForQuery = ((day-1)*9) + parseInt(period)
    const eachDaySchdule = await Daily.findOne({index:numberForQuery})
    const classesInUse = eachDaySchdule['classes']
    const mappedCIUarray = classesInUse.map((e)=>{
        return e[2]
    })
    let res = allClassesEverUsed.filter(x =>
    {
        return mappedCIUarray.indexOf(x)=== -1
    });
    return ['classes',res]
}

module.exports  = {
    getQuery,
    getOccupiedClasses,
    getNowPeriod,
    officialNamesForSubjects,
    dayToday
}