
const title = document.getElementById("Title-Date")
const nextArrow = document.getElementById("Next-month-arrow")
const lastArrow = document.getElementById("Last-month-arrow")
const refresBtn = document.getElementById("Refresh-Date")
const table = document.querySelectorAll(".calendar-container table tr > td")


let date = new Date()

const getMonthStr = (monthNum) => (
    [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ][monthNum]);

const getMonthNum =()=> date.getMonth()

// next month arrow handler
function nextMonth() {
    if (getMonthNum() >= 11) {
        date.setMonth(0)
        nextYear()
    } else {
        date.setMonth((getMonthNum() + 1) % 12)
    }
    updateTitle()
    updateCalDays()
}

// last month arrow handler
function lastMonth() {
    if (getMonthNum() <= 0) {
        date.setMonth(11)
        lastYear()
    } else {
        date.setMonth((getMonthNum() - 1))
    }
    updateTitle()
    updateCalDays()
}

// handle last/next year
function nextYear() {
    date.setFullYear(date.getFullYear() + 1)
}
function lastYear() {
    date.setFullYear(date.getFullYear() - 1)
}

// update calendar title value
function updateTitle() {
    title.innerHTML = getMonthStr(getMonthNum()) + " " + date.getFullYear()
}

// update day nodes in the calendar
function updateCalDays() {

    let current_date=new Date()
    let start_day = new Date(date.getFullYear(),getMonthNum()).getDay()
    let last_day = new Date(date.getFullYear(),getMonthNum(),0).getDate()

    for (let i = 0; i < 42; i++) {
        let dayNum = (i-start_day)+1

        const node = table[i]
        
        if(start_day > i | dayNum > last_day) {
            dayNum=""
            node.removeAttribute("data-content")
        }
        else {
            node.setAttribute("data-content",dayNum)
        }
            const isSameTime = current_date.toDateString() === date.toDateString()
            const isSameDay = dayNum == current_date.getDate()
            if(isSameTime && isSameDay) {
                node.className = "current-day"}
                else {
                console.log("start")
                node.classList.remove("current-day")}
            

        node.innerHTML = dayNum
    }
}

// set current date
function refreshDate() {
    date = new Date()
    updateCalDays()
    updateTitle()
}

updateCalDays()
updateTitle()