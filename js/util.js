import {ALERT_SHOW_TIME} from './const.js';

// Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

//Функция создания элемента с необходимым классом
const makeElement = (tagName, className) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

//Функция проверяющая нажата ли клавиша ESC
const isEscapeKey = (evt) => evt.key === 'Escape';

//Функция проверяющая нажата ли клавиша Enter
const isEnterKey = (evt) => evt.key === 'Enter';

//Функция вывода ошибки загрузки миниатюр
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.color = 'red';
  alertContainer.style.textAlign = 'center';
  alertContainer.textContent = message;
  document.body.appendChild(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Функция меняющая активный класс у кнопок
const toggleClassActive = (buttons, evt, activeClass) => {
  buttons.forEach((button)=> {
    button.classList.remove(activeClass);
  });
  if (evt.target) {
    evt.target.classList.add(activeClass);
  }
};

//Функция устранения дребезга
const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomInteger, makeElement, isEscapeKey, isEnterKey, showAlert, debounce, toggleClassActive};
