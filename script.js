const calculate = {
    add: function(x, y) {
        return x + y;
    },
    subtract: function(x, y) {
        return x - y;
    },
    multiply: function(x, y) {
        return x * y;
    },
    divide: function(x, y) {
        return x / y;
    },
    operate: function(operator, x, y) {
        if (operator == '+')
        {
            return calculate.add(x, y);
        }
        else if (operator == '-')
        {
            return calculate.subtract(x, y);
        }
        else if (operator == '*')
        {
            return calculate.multiply(x, y);
        }
        else if (operator == '/')
        {
            return calculate.divide(x, y);
        }
    }
};

const screenMemory = {
    displayed: [],
    operation: []
};


const buttons = document.getElementsByClassName('numbers');
for (let i = 0; i < buttons.length; i++)
{
    buttons[i].addEventListener('click', display);
}

function display () {
    let screen1 = document.getElementById('screen');
    let screentop = document.getElementById('screentop');

    if (screenMemory.displayed[0] == null && screen1.innerText.length != 0 && screentop.innerText.length != 0)
    {
        screen1.innerText = '';
        screentop.innerText = '';
    }

    let number = this.textContent;
    screen1.innerText = screen1.innerText + number;
}

const operatorButtons = document.getElementsByClassName('operatorButtons');
for (let i = 0; i < operatorButtons.length; i++)
{
    operatorButtons[i].addEventListener('click', operator);
}

function operator () {

    let screen1 = document.getElementById('screen');
    let screentop = document.getElementById('screentop');
    screenMemory.displayed.push(screen1.innerText);

    if (screenMemory.displayed[1] != null)
    {
        screenMemory.displayed[0] = Number(screenMemory.displayed[0]);
        screenMemory.displayed[1] = Number(screenMemory.displayed[1]);
    
        let solution = calculate.operate(
            screenMemory.operation[0], 
            screenMemory.displayed[0], 
            screenMemory.displayed[1]
        );

        screenMemory.displayed.pop();
        screenMemory.displayed.pop();
        screenMemory.operation.pop();

        screenMemory.displayed.push(solution);

        let operatorSymbol = this.textContent;
        screenMemory.operation.push(operatorSymbol);
        
        screen1.innerText = '';
        screentop.innerText = solution + screenMemory.operation[0];
        return;
    }

    screen1.innerText = '';
    
    let operatorSymbol = this.textContent;
    screenMemory.operation.push(operatorSymbol);

    screentop.innerText = screenMemory.displayed[0] + screenMemory.operation[0];
}

const equalButton = document.getElementById('equal');
equalButton.addEventListener('click', equal);

function equal () {
    let screen1 = document.getElementById('screen');
    let screentop = document.getElementById('screentop');
    screenMemory.displayed.push(screen1.innerText);

    screenMemory.displayed[0] = Number(screenMemory.displayed[0]);
    screenMemory.displayed[1] = Number(screenMemory.displayed[1]);

    let solution = calculate.operate(
        screenMemory.operation[0], 
        screenMemory.displayed[0], 
        screenMemory.displayed[1]
    );
    
    screentop.innerText = 
    screenMemory.displayed[0] + 
    screenMemory.operation[0] + 
    screenMemory.displayed[1] + 
    "=";

    screen1.innerText = solution;
    
    screenMemory.displayed.pop();
    screenMemory.displayed.pop();
    screenMemory.operation.pop();
}

const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', clear);

function clear () {

    screenMemory.displayed.pop();
    screenMemory.displayed.pop();
    screenMemory.operation.pop();

    let screen1 = document.getElementById('screen');
    let screentop = document.getElementById('screentop');
    screen1.innerText = '';
    screentop.innerText = '';
}