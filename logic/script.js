const Mongo = require('../mongoose/mongooseConnection')
const Schdule = require('../models/schdules')
const Daily = require("../models/daily")
const Students = require("../models/student")

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

Mongo.connectToMongoose()

const eachDaySchdule = Daily.find({})
const studentsData =Students.find({})

console.log(eachDaySchdule)
console.log(studentsData)


testingFunctionSetDay("1","4")

function testingFunctionSetDay(day,period){
    dayToday = day;
    defaultPeriod = period; 
}


function getNowPeriod() {
    if(secNow>=32400 && secNow<35400) return '1'
    else if(secNow>=35400 && secNow<38400) return '2'
    else if(secNow>=38400 && secNow<41400) return '3'
    else if(secNow>=41400 && secNow<44400) return '4'
    else if(secNow>=44400 && secNow<47400) return '5'
    else if(secNow>=47400 && secNow<50400) return '6'
    else if(secNow>=50400 && secNow<53400) return '7'
    else if(secNow>=53400 && secNow<56400) return '8'
    else if(secNow>=56400 && secNow<59400) return '9'
    else return defaultPeriod
}
function getQuery(day,period){
    const numberForQuery = ((day-1)*9) + parseInt(period)-1
    const query = days[day] + period
    return eachDaySchdule[numberForQuery][query]
}
function getOccupiedClasses(day,period){
    if(days[dayToday] === "Sunday"){
        showBox.innerHTML = `Its Sunday, no classes today :) `
        return
    }
    else if(days[dayToday] === "saturday"){
        showBox.innerHTML = `Its Sunday, no classes today :)`
        return
    }
    const numberForQuery = ((day-1)*9) + parseInt(period)-1
    const query = days[day] + period
    const classesInUse = eachDaySchdule[numberForQuery][query]
    showBox.innerHTML=""
    const mappedCIUarray = classesInUse.map((e)=>{
        return e.split("-")[2]
    })
    let res = allClassesEverUsed.filter(x =>
    {
        return mappedCIUarray.indexOf(x)=== -1
    });
    return res
}

module.exports  = {
    getQuery,
    getOccupiedClasses,
    getNowPeriod,
    days,
    allClassesEverUsed,
    officialNamesForSubjects,
    dayToday,
    studentsData
}