const schduleContiner = document.querySelector(".schdule")
const crossBtn = document.querySelector(".crossBtn button")
const days = ["Sunday","monday","tuesday","wednesday","thursday","friday"]
const allClassesEverUsed = ['311', '312', '318', '322', '323', '402', '409', '410', '411', '417', '420', '421', '501', '502', '509', '510', '511']
const showBox = document.querySelector(".ShowArea")


const timeNow = new Date()
const secNow = timeNow.getHours()*3600 + timeNow.getMinutes()*60
var dayToday = new Date().getDay()


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
    else return false
}

function handleQuickFind(){
    
    const numberForQuery = ((dayToday-1)*9) + parseInt(getNowPeriod())-1
    const query = days[dayToday] + getNowPeriod()
    const classesInUse = eachDaySchdule[numberForQuery][query]
    if(!getNowPeriod()){
        showBox.innerHTML=""
        showBox.innerHTML="<h1>You are not in Working Hour</h1>"
        return
    }
    showBox.innerHTML=""
    const mappedCIUarray = classesInUse.map((e)=>{
        return e.split("-")[2]
    })
    let res = allClassesEverUsed.filter(x =>
    {
        return mappedCIUarray.indexOf(x)=== -1
    });
    if(res.length){
       showBox.innerHTML = "<h3>Classes<br> <strong>TG-" + res.join(",<br> TG-") + "</strong> <br>are not Occupied</h3>"
    }else{
       showBox.innerHTML = "5th 4th and 3rd floor are all occupied<br><br>Circle 1 chale jao"
    }
    res=[]
}
function handleClear(){
    showBox.innerHTML=''
}
function handleGettingOccupiedClasses(){
    var dayQuery = document.querySelector("#dayQuery").value
    if(dayQuery==="today"){dayQuery=dayToday}
    const query = days[dayQuery] + document.getElementById("inputQuery").value
    const numberForQuery = 9*(dayQuery-1) + parseInt(document.getElementById("inputQuery").value)-1
    const classesInUse = eachDaySchdule[numberForQuery][query]
    const mappedCIUarray = classesInUse.map((e)=>{
        return e.split("-")[2]
    })
    showBox.innerHTML=""
    let res = allClassesEverUsed.filter(x =>
    {
        return mappedCIUarray.indexOf(x)=== -1
    });
    if(res.length){
       showBox.innerHTML = "<h3>Classes<br> <strong>TG-" + res.join(",<br> TG-") + "</strong> <br>are not Occupied</h3>"
    }else{
       showBox.innerHTML = "5th 4th and 3rd floor are all occupied<br><br>Circle 1 chale jao"
    }
    res=[]
}