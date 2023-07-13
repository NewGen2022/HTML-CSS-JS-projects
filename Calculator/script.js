let result = 0;
let display = "0";
let prevOperator;

const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  screen.innerText = display;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      display = "0";
      result = 0;
      break;
    case "=":
      if (prevOperator === null) {
        return;
      }
      flushOperation(parseFloat(display));
      prevOperator = null;
      display = result;
      result = 0;
      break;
    case "←":
      if (display.length === 1) {
        display = "0";
      } else {
        display = display.substring(0, display.length - 1);
      }
      break;
    case ".":
      display += ".";
      break;
    case "−":
    case "×":
    case "÷":
    case "+":
      handleMath(symbol);
      break;
  }
}

function handleMath(symbol) {
  if (display === "0") {
    return;
  }
  const floatBuffer = parseFloat(display);
  if (result === 0) {
    result = floatBuffer;
  } else {
    flushOperation(floatBuffer);
  }
  prevOperator = symbol;
  display = "0";
}

function flushOperation(buffer_num) {
  if (prevOperator === "+") {
    result += buffer_num;
  } else if (prevOperator === "−") {
    result -= buffer_num;
  } else if (prevOperator === "×") {
    result *= buffer_num;
  } else if (prevOperator === "÷") {
    result /= buffer_num;
  }
}

function handleNumber(numberStr) {
  if (display === "0") {
    display = numberStr;
  } else {
    display += numberStr;
  }
}

function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

init();
