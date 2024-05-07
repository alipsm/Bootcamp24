const table = document.querySelectorAll(".calendar-container table tr > td")

console.log('table', table)
let count=1;
table.forEach(td=>{
    console.log("hi")
    td.innerHTML=count++
})

function addRow() {
}