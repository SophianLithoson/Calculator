const expressionArea = document.getElementById("expression-list");
const resultArea = document.getElementById("result-display");
const digitButtons = document.querySelectorAll(".digit");
const operatingButtons = document.querySelectorAll(".operating");

var currentTotal = "";
var newNumber = "";
var decimalExists = false;
var lastOperator = "=";

// set listeners here

[...digitButtons].forEach((digBut) => {
    digBut.addEventListener("click", () => {
        let inputDigit = digBut.textContent;
        console.log(inputDigit);

        switch (inputDigit) {
            case ".":
                if (!decimalExists) {
                    newNumber += inputDigit;
                    decimalExists = true;
                }
                break;
            case "CE":
                newNumber = "";
                decimalExists = false;
                break;
            case "del":
                if (newNumber.slice(-1) === ".")
                    decimalExists = false;
                newNumber = newNumber.slice(0, -1);
                break;
            case "±":
                if (+newNumber > 0)
                    newNumber = "-" + newNumber;
                else
                    newNumber = newNumber.slice(1);
                break;
            default:
                newNumber += inputDigit;
        }
        updateDisplay();
    });
});

[...operatingButtons].forEach((opBut) => {
    opBut.addEventListener("click", () => {
        let inputAction = opBut.textContent;
        console.log(inputAction);

        switch (inputAction) {
            case "C":
                currentTotal = "";
                newNumber = "";
                lastOperator = "=";
                decimalExists = false;
                break;
            case "=":
                if (lastOperator === "=" || currentTotal === "DIVZERO") {
                    currentTotal = newNumber;
                    newNumber = "";
                    decimalExists = false;
                }
                else {
                    currentTotal = operate(+currentTotal, lastOperator, +newNumber);
                    lastOperator = "=";
                    newNumber = "";
                    decimalExists = false;
                }
                break;
            default:
                if (lastOperator === "=" || currentTotal === "DIVZERO")
                    currentTotal = newNumber;
                else
                    currentTotal = operate(+currentTotal, inputAction, +newNumber);
                
                lastOperator = inputAction;
                newNumber = "";
                decimalExists = false;
        }
        updateDisplay();
    });
});



// define listener functions here

// logic functions go here
function operate(firstNum, operator, secondNum) {
    switch (operator) {
        case "+":
            return firstNum + secondNum;
        case "-":
            return firstNum - secondNum;
        case "✕":
            return firstNum * secondNum;
        case "÷":
            if (secondNum)
                return firstNum / secondNum;
            else
                return "DIVZERO";
    }
}

function updateDisplay() {
    expressionArea.textContent = currentTotal;
    resultArea.textContent = newNumber;
}