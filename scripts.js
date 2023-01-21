const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement; // Caixa de texto. (div)
    this.currentOperandTextElement = currentOperandTextElement; // Caixa de texto. (div)
    this.clear();
  }

  formatDisplayNumber(number) {
    // Formata os números com (,).
    const stringNumber = number.toString();

    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  delete() {
    // Apaga os valores 1 por 1.
    this.currentOperand = this.currentOperand.slice(0, -1);
  }

  calculate() {
    let result;
    const _previousOperand = parseFloat(this.previousOperand);
    const _currentOperand = parseFloat(this.currentOperand);

    if (isNaN(_previousOperand) || isNaN(_currentOperand)) return; // Se não for um número, o if acaba. (apenas para precaução).

    if (this.operation == "+") {
      // Ao clicar nos operadores, o resultado fica armazenado no previousOperand.
      result = _previousOperand + _currentOperand;
    } else if (this.operation == "-") {
      result = _previousOperand - _currentOperand;
    } else if (this.operation == "x") {
      result = _previousOperand * _currentOperand;
    } else if (this.operation == "÷") {
      result = _previousOperand / _currentOperand;
    }

    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return; // Caso não tenha nenhum número, não deixa adicionar operadores.
    // Adiciona operadores.
    if (this.previousOperand !== "") {
      // Caso tive algum número, vai calcular.
      this.calculate();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  appendNumber(number) {
    if (this.currentOperand.includes(".") && number === ".") return; // Caso aconteça, sai do if.
    // Adiciona Números.
    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }

  clear() {
    // Apaga tudo.
    this.previousOperand = ""; // Números em si
    this.currentOperand = ""; // Números em si
    this.operation = undefined; // Operações
  }

  updateDisplay() {
    // Atualiza a caixa de texto (div).
    this.previousOperandTextElement.textContent = `${this.formatDisplayNumber(
      this.previousOperand
    )} ${
      this.operation || "" // Adiciona o número e a operação.
    }`;
    this.currentOperandTextElement.textContent = this.formatDisplayNumber(
      this.currentOperand
    );
  }
}

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

for (const numberButton of numberButtons) {
  // Varre todos os números
  numberButton.addEventListener("click", () => {
    calculator.appendNumber(numberButton.textContent);
    calculator.updateDisplay();
  });
}

for (const operationButton of operationButtons) {
  // Varre todos os operadores~
  operationButton.addEventListener("click", () => {
    calculator.chooseOperation(operationButton.textContent);
    calculator.updateDisplay();
  });
}

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

equalsButton.addEventListener("click", () => {
  calculator.calculate(); // Ao clicar no igual os valores ficam armazenados no currentOperand.
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
