document.addEventListener('DOMContentLoaded', function() {
  const display = document.getElementById('display');
  const buttons = Array.from(document.getElementsByClassName('btn'));
  
  let currentInput = '';
  let operator = null;
  let previousInput = '';
  
  function calculate() {
    if (!operator || !previousInput || !currentInput) return;
    previousInput = parseFloat(previousInput);
    currentInput = parseFloat(currentInput);
    
    switch (operator) {
      case '+':
        previousInput += currentInput;
        break;
      case '-':
        previousInput -= currentInput;
        break;
      case '*':
        previousInput *= currentInput;
        break;
      case '/':
        if (currentInput === 0) {
          alert("Cannot divide by zero");
          clearDisplay();
          return;
        }
        previousInput /= currentInput;
        break;
    }
    
    display.innerText = previousInput;
    currentInput = '';
    operator = null;
  }

  function clearDisplay() {
    currentInput = '';
    operator = null;
    previousInput = '';
    display.innerText = '0';
  }
  
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const num = button.getAttribute('data-num');
      const op = button.getAttribute('data-operator');
      const dot = button.getAttribute('data-dot');
      
      if (num !== null) {
        currentInput += num;
        display.innerText = currentInput;
      } else if (op !== null) {
        if (currentInput === '') {
          currentInput = '0';
        }
        if (previousInput && currentInput && operator) {
          calculate();
        } else {
          previousInput = currentInput;
          currentInput = '';
        }
        operator = op;
      } else if (dot !== null) {
        if (!currentInput.includes(dot)) {
          currentInput += dot;
          display.innerText = currentInput;
        }
      } else if (button.id === 'equal') {
        calculate();
      } else if (button.id === 'clear') {
        clearDisplay();
      } else if (button.id === 'backspace') {
        currentInput = currentInput.slice(0, -1);
        display.innerText = currentInput || '0';
      }
    });
  });
});
