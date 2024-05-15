<script setup>
import { onMounted } from 'vue';
import Button from '../components/ui/elements/Button/Button.vue';
import Input from '../components/ui/elements/Input/Input.vue'

// elements
let Prev_Number ,ViewInput,Marks;

let tempNum, final, tempOperator;

// init elements
onMounted(() => {
  Prev_Number = document.getElementById('Prev_Number');
  ViewInput = document.getElementById('View_Input');
  Marks = document.getElementById('Marks');
})

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
  try {
    result = operatorResult(+num1, +num2, operator)
  } finally {
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
const clearStates = (clearView = false) => {
  Prev_Number.innerHTML = '';
  Marks.innerHTML = '';
  tempOperator = ""
  tempNum = '';
  final = ""

  if (clearView) ViewInput.value = ""
}

const operatorResult = (num1, num2, operator) => ({ "+": num1 + num2, "-": num1 - num2, "*": num1 * num2 }[operator])
const isOperator = (symbol) => (["+", "-", "*"].includes(symbol))
</script>

<template>

  <body id="root">
    <div :class="[$style.cal_container]">
      <Input markId="Marks" prevInputId="Prev_Number" inputId="View_Input" />
      <br>
      <main>
        <div :class="[$style.eghamat24_logo_container]">
          <Button text="C" @click="operation('C')" uiType="outline" />
          <div id="Eghamat24_logo">
            <img src="./assets/img/primary_logo.png" alt="">
          </div>
          <Button text="<-" @click="operation('<-')" uiType="outline" />
        </div>
        <div>
          <Button text="7" @click="operation(7)" />
          <Button text="8" @click="operation(8)" />
          <Button text="9" @click="operation(9)" />
          <Button text="x" @click="operation('*')" uiType="outline" />
        </div>
        <div>
          <Button text="4" @click="operation(4)" />
          <Button text="5" @click="operation(5)" />
          <Button text="6" @click="operation(6)" />
          <Button text="-" @click="operation('-')" uiType="outline" />
        </div>
        <div>
          <Button text="1" @click="operation(1)" />
          <Button text="2" @click="operation(2)" />
          <Button text="3" @click="operation(3)" />
          <Button text="+" @click="operation('+')" uiType="outline" />
        </div>
        <div>
          <Button text="-/+" @click="operation('-/+')" uiType="outline" />
          <Button text="0" @click="operation(0)" />
          <Button text="." @click="operation('.')" uiType="outline" />
          <Button text="=" @click="show_final()" uiType="primery" />
        </div>
      </main>
    </div>
  </body>
</template>

<style module lang="scss">
@import url(./assets/styles/index.module.scss);
</style>