const expressionArea = document.getElementById("#expression-list");
const resultArea = document.getElementById("#result-display");
const digitButtons = document.querySelectorAll(".digit");
const operatingButtons = document.querySelectorAll(".operating");

var currentTotal = 0;
var newNumber = "0";
var decimalExists = false;

// set listeners here

[...digitButtons].forEach((digBut) => {
    digBut.addEventListener("click", () => {
        console.log(digBut.textContent);
    });
});

[...operatingButtons].forEach((opBut) => {
    opBut.addEventListener("click", () => {
        console.log(opBut.textContent);
    });
});



// define listener functions here

// logic functions go here
function operate(firstNum, operator, secondNum) {
    switch (operator) {
        case "plus":
            return firstNum + secondNum;
        case "minus":
            return firstNum - secondNum;
        case "times":
            return firstNum * secondNum;
        case "divide":
            if (secondNum)
                return firstNum / secondNum;
            else
                return "DIVZERO";
    }
}

function updateDisplay() {
    
    expressionArea.textContent = currentTotal;
    newNumber = "0";
    resultArea.textContent = newNumber;
}