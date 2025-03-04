document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    const buttons = document.querySelector('.buttons');
    let firstOperand = '';
    let secondOperand = '';
    let currentOperation = null;
    let shouldResetDisplay = false;

    buttons.addEventListener('click', e => {
        if (e.target.matches('button')) {
            const button = e.target;
            const buttonContent = button.textContent;

            if (button.classList.contains('number')) {
                inputNumber(buttonContent);
            } else if (button.classList.contains('operator')) {
                inputOperator(buttonContent);
            } else if (button.classList.contains('equals')) {
                calculate();
            } else if (button.classList.contains('decimal')) {
                inputDecimal();
            } else if (button.classList.contains('clear')) {
                clear();
            }
        }
    });

    function inputNumber(number) {
        if (shouldResetDisplay) {
            display.value = number;
            shouldResetDisplay = false;
        } else {
            display.value = display.value === '0' ? number : display.value + number;
        }
    }

    function inputOperator(operator) {
        if (currentOperation !== null) calculate();
        firstOperand = display.value;
        currentOperation = operator;
        shouldResetDisplay = true;
    }

    function calculate() {
        if (currentOperation === null || shouldResetDisplay) return;
        secondOperand = display.value;
        display.value = operate(currentOperation, parseFloat(firstOperand), parseFloat(secondOperand));
        currentOperation = null;
    }

    function operate(operator, a, b) {
        switch (operator) {
            case '+': return a + b;
            case '-': return a - b;
            case '×': return a * b;
            case '÷': return b !== 0 ? a / b : 'Error';
            default: return null;
        }
    }

    function inputDecimal() {
        if (!display.value.includes('.')) {
            display.value += '.';
        }
    }

    function clear() {
        display.value = '0';
        firstOperand = '';
        secondOperand = '';
        currentOperation = null;
    }
});
