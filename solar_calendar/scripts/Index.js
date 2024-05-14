import { Modal } from "./modal.js"

const title = document.getElementById("Title-Date")
const table = document.querySelectorAll(".calendar-container table tr > td")

let date = new Date()

const getMonthStr = (monthNum) => (
    [
        "فروردین",
        "اردیبهشت",
        "خرداد",
        "تیر",
        "مرداد",
        "شهریور",
        "مهر",
        "آبان",
        "آذر",
        "دی",
        "بهمن",
        "اسفند"
    ][monthNum-1]);


const getSolarDate = (prop) => new Intl.DateTimeFormat('fa-IR-u-nu-latn').format(prop||date)
const getMonthNum = () => getSolarDate().split("/")[1]
const getYearNum = () => getSolarDate().split("/")[0]
const getDayWithDate=(date) =>getSolarDate(date).split("/")[2]
const getDaysOfMonth=(monthNum)=>{
    if (monthNum>=6) 
        return 31
    return 30
}


// next month arrow handler
function nextMonth() {
        date.setMonth((date.getMonth() + 1))
    updateTitle()
    updateCalDays()
}

// last month arrow handler
function lastMonth() {
    date.setMonth((date.getMonth() - 1))
    updateTitle()
    updateCalDays()
}

// update calendar title value
function updateTitle() {
    title.innerHTML = getMonthStr(getMonthNum()) + " " + getYearNum()
}

// update day nodes in the calendar
function updateCalDays() {

    let current_date = new Date()

    let start_day = 0
    let last_day = getDaysOfMonth(getMonthNum())

    for (let i = 0; i < 42; i++) {
        let dayNum = (i - start_day) + 1

        const node = table[i]
        if (start_day > i | dayNum > last_day) {
            dayNum = ""
            node.removeAttribute("data-content")
        }
        else {
            node.setAttribute("data-content", dayNum)
        }
        
        const isSameTime = getSolarDate(current_date) === getSolarDate(date)
        
        const isSameDay = dayNum == getDayWithDate(current_date)

        if (isSameTime && isSameDay) {
            node.className = "current-day"
        }else {
            node.classList.remove("current-day")
        }
        node.innerHTML = `<span>${dayNum}</span>`
    }
}

// set current date
function refreshDate() {
    date = new Date()
    updateCalDays()
    updateTitle()
}


// Initialization
updateCalDays()
updateTitle()




// handle event listeners
document.getElementById("Last-month-arrow").addEventListener("click",()=>{
    lastMonth()
})
document.getElementById("Next-month-arrow").addEventListener("click",()=>{
    nextMonth()
})
document.getElementById("Refresh-Date").addEventListener("click",()=>{
    refreshDate()
})

document.querySelectorAll("td[data-content]").forEach(element=>{
    const modal = new Modal("Modal")
    modal.setTitle("Solar Calendar")
    let day =element.getAttribute("data-content")
    element.addEventListener('click', function (event) {
        modal.setContent(`<h3>شما در روز ${day} از ماه ${getMonthStr(getMonthNum())} هستید و هیچ مناسبتی برایه این روز تنظیم نشده است</h3>`)
        modal.setVisible("true")
        console.log(attribute)
    }, true);
})
