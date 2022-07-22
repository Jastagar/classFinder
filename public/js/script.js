const schduleContiner = document.querySelector(".schdule")
const crossBtn = document.querySelector(".crossBtn button")
const days = ["Sunday","monday","tuesday","wednesday","thursday","friday"]
const allClassesEverUsed = ['311', '312', '318', '322', '323', '402', '409', '410', '411', '417', '420', '421', '501', '502', '509', '510', '511']
const showBox = document.querySelector(".ShowArea")


const timeNow = new Date()
const secNow = timeNow.getHours()*3600 + timeNow.getMinutes()*60

function getNowPeriod() {
    if(secNow>=32400 && secNow<35400) return '1'
    if(secNow>=35400 && secNow<38400) return '2'
    if(secNow>=38400 && secNow<41400) return '3'
    if(secNow>=41400 && secNow<44400) return '4'
    if(secNow>=44400 && secNow<47400) return '5'
    if(secNow>=47400 && secNow<50400) return '6'
    if(secNow>=50400 && secNow<53400) return '7'
    if(secNow>=53400 && secNow<56400) return '8'
    if(secNow>=56400 && secNow<59400) return '9'
}

console.log(secNow)

function handleQuickFind(){
    const dayQuery = document.querySelector("#dayQuery").value
    console.log(dayQuery)
    var dayToday =''
    dayQuery? dayToday = dayQuery:dayToday = new Date().getDay()
    const classesInUse = []
    console.log(getNowPeriod())
    const query = days[dayToday] + getNowPeriod()
    
    showBox.innerHTML=""
    document.querySelectorAll(`.${query}`).forEach(e=>{
        if(e.innerText){
            classesInUse.push(e.innerText.split("-")[2])
        }
    })
    let res = allClassesEverUsed.filter(x =>
    {
        return classesInUse.indexOf(x)=== -1
    });
    if(res.length){
       showBox.innerHTML = "<h3>Classes<br> <strong>TG-" + res.join(",<br> TG-") + "</strong> <br>are not Occupied</h3>"
    }else{
       showBox.innerHTML = "5th 4th and 3rd floor are all occupied<br><br>Circle 1 chale jao"
    }
    res=[]
}
function handleToggleSchdule(){
    if(schduleContiner.classList.contains("autoHeight")){
        schduleContiner.classList.remove("autoHeight")
    }else{
        schduleContiner.classList.add("autoHeight")
    }
}
function handleClear(){
    showBox.innerHTML=''
}

function handleGettingOccupiedClasses(){
    const dayQuery = document.querySelector("#dayQuery").value
    console.log(dayQuery)
    var dayToday =''
    dayQuery? dayToday = dayQuery:dayToday = new Date().getDay()
    const classesInUse = []
    
    const query = days[dayToday] + document.getElementById("inputQuery").value
    
    showBox.innerHTML=""
    document.querySelectorAll(`.${query}`).forEach(e=>{
        if(e.innerText){
            classesInUse.push(e.innerText.split("-")[2])
        }
    })
    let res = allClassesEverUsed.filter(x =>
    {
        return classesInUse.indexOf(x)=== -1
    });
    if(res.length){
       showBox.innerHTML = "<h3>Classes<br> <strong>TG-" + res.join(",<br> TG-") + "</strong> <br>are not Occupied</h3>"
    }else{
       showBox.innerHTML = "5th 4th and 3rd floor are all occupied<br><br>Circle 1 chale jao"
    }
    res=[]
}