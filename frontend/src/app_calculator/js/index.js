import '../styles/index.scss';

const buttonsDictionary = {};
const mainWrapper = document.getElementById('calculator');
const buttons = mainWrapper.querySelectorAll('button');
const input = mainWrapper.querySelector('input');
const prevValueElement = mainWrapper.querySelector('.c-calculator-field__prevvalue');
let prevValue = '';
let value = '';

const parseButtonContent = (content) => content.toLowerCase().trim();

const update = (_value, options = {}) => {
  if (options.shouldUpdatePrevValue) {
    prevValue = value;
    prevValueElement.textContent = prevValue;
  }

  if (options.shouldClearPrevValue) {
    prevValue = '';
    prevValueElement.textContent = prevValue;
  }
  value = `${_value}`;
  input.value = value;
};

const submit = async (_value) => {
  try {
    let res = await fetch(`/api/calculator/calculate?${new URLSearchParams({
      value: _value,
    })}`);
    if (!res.ok) {
      throw new Error();
    }

    res = await res.json();
    update(res, { shouldUpdatePrevValue: true });
  } catch (e) {
    console.error(e);
  }
};

const handleUserAction = (e) => {
  const isClick = e.type === 'click';

  let content;
  if (isClick) {
    content = parseButtonContent(e.target.textContent);
  } else {
    content = parseButtonContent(e.key);
  }

  const pressedAction = buttonsDictionary[content];
  if (!pressedAction) {
    return;
  }

  if (!isClick && pressedAction.element) {
    pressedAction.element.click();
    pressedAction.element.classList.add('active');
    setTimeout(() => {
      pressedAction.element.classList.remove('active');
    }, 150);
    return;
  }

  if (pressedAction.type === 'action') {
    if (pressedAction.content === 'backspace') {
      update(value.slice(0, value.length - 1));
    } else if (pressedAction.content === 'escape' || pressedAction.content === 'c') {
      update('', { shouldClearPrevValue: true });
    } else if (pressedAction.content === 'enter' || pressedAction.content === '=') {
      submit(value);
    }
  } else if (pressedAction.type === 'operand') {
    update(value + pressedAction.content.replace(',', '.'));
  } else {
    const lastChar = value[value.length - 1];
    if (buttonsDictionary[lastChar] && buttonsDictionary[lastChar].type === 'operator') {
      update(value.slice(0, value.length - 1) + pressedAction.content);
    } else {
      update(value + pressedAction.content);
    }
  }
};

const handleInputKeyDown = (e) => {
  e.preventDefault();
};

buttons.forEach((button) => {
  const buttonContent = parseButtonContent(button.textContent);
  button.addEventListener('click', handleUserAction);

  buttonsDictionary[buttonContent] = {
    type: button.getAttribute('data-calculator-type'),
    content: buttonContent,
    element: button,
  };
});

window.addEventListener('keydown', handleUserAction);
input.addEventListener('keydown', handleInputKeyDown);
