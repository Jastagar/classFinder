const schduleContiner = document.querySelector(".schdule")
const crossBtn = document.querySelector(".crossBtn button")
const days = ["Sunday","monday","tuesday","wednesday","thursday","friday"]
const allClassesEverUsed = ['311', '312', '318', '322', '323', '402', '409', '410', '411', '417', '420', '421', '501', '502', '509', '510', '511']


function handleToggleSchdule(){
    if(schduleContiner.classList.contains("autoHeight")){
        schduleContiner.classList.remove("autoHeight")
    }else{
        schduleContiner.classList.add("autoHeight")
    }
}
function handleGettingOccupiedClasses(){
    const dayQuery = document.querySelector("#dayQuery").value
    var dayToday =''
    dayQuery? dayToday = dayQuery:dayToday = new Date().getDay()
    const classesInUse = []
    
    const query = days[dayToday] + document.getElementById("inputQuery").value
    const showBox = document.querySelector(".ShowArea")
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