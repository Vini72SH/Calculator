const screenText = document.querySelector('.result');
const buttonClear = document.querySelector('.btn.clear');
const numberButtons = document.querySelectorAll('.btn.number');
const operatorButtons = document.querySelectorAll('.btn.operator')
const equalButton = document.querySelector('.btn.equal');
const dotButton = document.querySelector('.btn.dot');

let oper1 = {num: ''};
let oper2 = {num: ''};

let operator = oper1;
screenText.textContent = '';

let opSelected = false;
let op = '';

let dot = false;

function clear() {
    screenText.textContent = '';
    oper1.num = '';
    oper2.num = '';
    operator = oper1;
    opSelected = false;
    dot = false;
    op = '';
}

function error() {
    oper1.num = '';
    oper2.num = '';
    operator = oper1;
    opSelected = false;
    dot = false;
    op = '';
}

function eval(a, operator, b) {
    let result;
    let numA = parseFloat(a);
    let numB = parseFloat(b);

    switch (operator) {
        case '+':
            result = numA + numB;
            break;
        case '-':
            result = numA - numB;
            break;
        case '*':
            result = numA * numB;
            break;
        case '/':
            if (numB != 0) {
                result = numA / numB;
            } else {
                result = 'ERROR';
            }
            break;
    }

    return result;
}

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (screenText.textContent == 'ERROR') {
            screenText.textContent = '';
        }
        if (!(button.value == 0 && screenText.textContent == '')) {
            screenText.textContent = screenText.textContent + button.value;
            operator.num = operator.num + button.value;
        }
    });
});

operatorButtons.forEach((button) => {
    let partial;
    button.addEventListener('click', () => {
        dot = false;
        if (opSelected == false) {
            opSelected = true;
            op = button.value;
            operator = oper2;
            screenText.textContent =
                screenText.textContent + ' ' + button.value + ' ';
        } else {
            partial = eval(oper1.num, op, oper2.num);
            if (partial != 'ERROR') {
                oper1.num = partial;
                oper2.num = '';
                operator = oper2;
                screenText.textContent = partial + ' ' + button.value + ' ';
                opSelected = true;
                op = button.value;
            } else {
                screenText.textContent = partial;
                error();
            }
        }
    });
});

equalButton.addEventListener('click', () => {
    let result = eval(oper1.num, op, oper2.num);
    screenText.textContent = result;
    if (result != 'ERROR') {
        oper1.num = result;
        oper2.num = '';
        operator = oper1;
        opSelected = false;
        dot = !(result === parseInt(result));
        op = '';
    } else {
        error();
    }
});

dotButton.addEventListener('click', () => {
    if (dot === false) {
        if (operator.num != '') {
            dot = true;
            screenText.textContent = screenText.textContent + '.';
            operator.num = operator.num + '.';
        }
    }
});

buttonClear.addEventListener('click', () => {clear()});