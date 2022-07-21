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
console.log(days)
function handleGettingOccupiedClasses(){
    const dayToday = new Date().getDay()
    const classesInUse = []
    console.log(days.dayToday);
    console.log("Form Submitted")
    
    const query = days[dayToday] + document.getElementById("inputQuery").value
    document.getElementById("tempans").innerHTML=""
    document.querySelectorAll(`.${query}`).forEach(e=>{
        if(e.innerText){
            classesInUse.push(e.innerText.split("-")[2])
        }
    })
    let res = classesInUse.filter(x =>
    {
        return allClassesEverUsed.find(x)!== -1
    });
    console.log(classesInUse)
    console.log(res)
}