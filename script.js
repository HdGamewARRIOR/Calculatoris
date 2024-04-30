let display = document.getElementById('display');
let symbolsVisible = false;
let radSelected = false;
let invSelected = false;
let degSelected = false;
let memory = 0;

function appendToDisplay(value) {
  if (value === '×') {
    value = '×';
  } else if (value === '÷') {
    value = '÷';
  } else if (value === '**0.5') {
    value = '**0.5';
  } else if (value === '**') {
    value = '**';
  }
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function removeLast() {
  let currentValue = display.value;
  let lastCharacter = currentValue.slice(-1);

  // Remove the last character, number, or function
  if (['+', '-', '*', '/', '%', '.'].includes(lastCharacter)) {
    display.value = currentValue.slice(0, -1);
  } else if (currentValue.endsWith('√') || currentValue.endsWith('x²') || currentValue.endsWith('**')) {
    display.value = currentValue.slice(0, -1);
  } else {
    let newValue = currentValue.replace(/(\d+|\.\d+)$/, '');
    display.value = newValue;
  }
}

function calculate() {
  try {
    let result = eval(display.value.replace(/÷/g, '/').replace(/×/g, '*').replace(/%/g, '/100'));
    if (!isFinite(result)) {
      display.value = 'Error';
    } else {
      display.value = result;
    }
  } catch (error) {
    display.value = 'Error';
  }
}

function toggleSymbols() {
  if (!symbolsVisible) {
    display.value += '√';
    symbolsVisible = true;
  } else {
    display.value = display.value.slice(0, -1);
    symbolsVisible = false;
  }
}

function toggleRad() {
  if (!radSelected) {
    display.value += 'Rad';
    radSelected = true;
  } else {
    display.value = display.value.replace('Rad', '');
    radSelected = false;
  }
}

function toggleInv() {
  if (!invSelected) {
    display.value += 'Inv';
    invSelected = true;
  } else {
    display.value = display.value.replace('Inv', '');
    invSelected = false;
  }
}

function toggleDeg() {
  if (!degSelected) {
    display.value += 'Deg';
    degSelected = true;
  } else {
    display.value = display.value.replace('Deg', '');
    degSelected = false;
  }
}

function memoryFunction(operation) {
  if (operation === 'M+') {
    memory += parseFloat(display.value);
  } else if (operation === 'M-') {
    memory -= parseFloat(display.value);
  } else if (operation === 'MR') {
    display.value = memory;
  } else if (operation === 'MC') {
    memory = 0;
  }
}
