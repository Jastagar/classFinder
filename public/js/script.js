const schduleContiner = document.querySelector(".schdule")
const crossBtn = document.querySelector(".crossBtn button")
const findStudentBtn = document.querySelector(".getData")
const days = ["Sunday","monday","tuesday","wednesday","thursday","friday"]
const allClassesEverUsed = ['311', '312', '318', '322', '323', '402', '409', '410', '411', '417', '420', '421', '501', '502', '509', '510', '511']
const showBox = document.querySelector(".ShowArea")
const officialNamesForSubjects = {
    nl:["NALR","Numerical Ability and Logical Reasonging"],
    pa:["PA","Programming Abstractions"],
    fd:["F& D","Frontend Web Development"]
}

const timeNow = new Date()
const secNow = timeNow.getHours()*3600 + timeNow.getMinutes()*60
var dayToday = new Date().getDay()
var defaultPeriod = false



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
    const numberForQuery = ((day-1)*9) + parseInt(period)-1
    const query = days[day] + period
    console.log(query)
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
function displayResults(result){
    if(result.length){
        showBox.innerHTML = "<h3>Classes<br> <strong>TG-" + result.join(",<br> TG-") + "</strong> <br>are not Occupied</h3>"
     }else{
        showBox.innerHTML = "5th 4th and 3rd floor are all occupied<br><br>Circle 1 chale jao"
     }
}
function handleQuickFind(){
    if(!getNowPeriod()){
        showBox.innerHTML="<h1>You are not in Working Hour</h1>"
        return []
    }
    const res = getOccupiedClasses(dayToday,getNowPeriod())
    displayResults(res)
    return [((dayToday-1)*9),parseInt(getNowPeriod())]
}
function handleClear(){
    showBox.innerHTML=''
}
function handleStudentFind(){
    const queryRL = document.getElementById("studentRollnumber").value
    if(!queryRL) {
        showBox.innerHTML=" Koi number toh daal do phele :|"
        return
    }
    const found = studentsData.find((each)=>{
        return each.rollnumber === queryRL
    })
    if(found){
        var studentsClassInfo =[] 
        if(getNowPeriod()){
            const classData = getQuery(dayToday,getNowPeriod())
            const groupRex = new RegExp(found.group,"i")
            studentsClassInfo = classData.find((each)=>{
                const ret = each.match(groupRex)
                return ret
            })
        }
        if(!studentsClassInfo.length){
            showBox.innerHTML = "This Student has a free period now, no further data available<br><br> &nbsp;&nbsp; KHUD DONDO LO :)"
            return
        }
        var [group,subject,classNumber,FCnumber] = studentsClassInfo.split("-")
        showBox.innerHTML= `
        Name: ${found.name}<br>
        RollNumber: ${found.rollnumber}<br>
        Group: ${found.group}<br>
        `
        if(getNowPeriod()){
            showBox.innerHTML += `
            This student should be in his/her class of: ${officialNamesForSubjects[subject][0]} in <br> ClassNumber TG-${classNumber}<br>
            by Faculty no: ${FCnumber}<br>
            `
        }
    }else{
        showBox.innerHTML = "Please Check the number again"
    }
}
function handleQuickFindForNext(){
    const nextPeriod = handleQuickFind()
    displayResults(nextPeriod)
}
function handleGettingOccupiedClasses(){
    var dayQuery = document.querySelector("#dayQuery").value
    const periodValue = document.getElementById("inputQuery").value
    if(dayQuery==="today"){dayQuery=dayToday}
    const res = getOccupiedClasses(dayQuery,periodValue)
    displayResults(res)
    res=[]
}