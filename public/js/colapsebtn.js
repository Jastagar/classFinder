const specificFindBtn = document.getElementById('specificFind')
const studentFindBtn = document.getElementById('studentFind')
const schduleFindBtn = document.getElementById('schdules')

const specificFindForm = document.getElementById('specificFindForm')
const studentFindForm = document.getElementById('studentFindForm')
const schduleFindForm = document.getElementById('schduleFindForm')

function colapseSpecific(){
    console.log("I was Clicked")
    if(specificFindForm.classList.contains('classShow')){
        specificFindForm.classList.remove('classShow')
    }else{
        specificFindForm.classList.add('classShow')
    }
}
function colapseStudent(){
    console.log("I was Clicked")
    if(studentFindForm.classList.contains('classShow')){
        studentFindForm.classList.remove('classShow')
    }else{
        studentFindForm.classList.add('classShow')
    }
}
function colapseSchdule(){
    console.log("I was Clicked")
    if(schduleFindForm.classList.contains('classShow')){
        schduleFindForm.classList.remove('classShow')
    }else{
        schduleFindForm.classList.add('classShow')
    }
}