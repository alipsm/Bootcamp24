let Prev_Number = document.getElementById('Prev_Number');
let ViewInput = document.getElementById('View_Input');
let Marks = document.getElementById('Marks');

let tempNum,final,tempOperator;

function operation(keyword) {

    if (Number.isInteger(keyword))
        displayValue(keyword)
    
    if (isOperator(keyword)) 
        setOperator(keyword)
    

    switch (keyword) {
        case '.':
            if (final != undefined || final != '') {
                if (!final.includes('.')) {
                    final += '.';
                    ViewInput.value = final;
                }
            }
            break;
        case '-/+':
            if (ViewInput.value != '') {
                if (ViewInput.value.includes('-')) {
                    ViewInput.value = ViewInput.value.replace('-', '');
                    final = final.replace('-', '');
                } else {
                    ViewInput.value = '-' + ViewInput.value;
                    final = '-' + final;
                }
            }
            break;
        case 'C':
            clearStates(true)
            break;
        case '<-':
            ViewInput.value = ViewInput.value.slice(0, ViewInput.value.length - 1);
            final = final.slice(0, final.length - 1)
            break;
        default:
            break;
    }
}

function show_final() {
    if (tempNum != '') {
        let inner_operator = tempOperator
        ViewInput.value = calculate(tempNum, ViewInput.value, inner_operator);
        clearStates()
        final = ViewInput.value;
    }
}

function calculate(num1, num2, operator) {
    let result = "Error"
    console.log('result', operator)
    try {
        result = operatorResult(+num1,+num2,operator)
    }finally{
        return result
    }
}

// handle text box value (view)
function displayValue(value) {
    if (final === undefined) {
        final = value;
        ViewInput.value = value;
    } else {
        final += new String(value);
        ViewInput.value = final;
    }
}

// set operator for calculate (input marker)
function setOperator(operator) {
    if (ViewInput.value != '') {
        if (tempNum == '' || tempNum === undefined) {
            tempNum = final;
            Prev_Number.innerHTML = final;
            final = '';
            ViewInput.value = '';
        }
        Marks.innerHTML = operator
        tempOperator = operator
    }
}

/// helpers
const clearStates=(clearView=false)=>{
    Prev_Number.innerHTML = '';
    Marks.innerHTML = '';
    tempOperator=""
    tempNum = '';
    final = ""
    
    if(clearView) ViewInput.value=""
}
const operatorResult = (num1,num2,operator) => ({ "+": num1 + num2, "-": num1 - num2, "*": num1 * num2 }[operator])
const isOperator = (symbol) => (["+", "-", "*"].includes(symbol))