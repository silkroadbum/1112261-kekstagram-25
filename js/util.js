// Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

//Функция проверки длины строки
const checkStringLength = (testString, maxLength) => testString.length <= maxLength;

//Функция получения рандомного элемента из массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//Функция создания элемента с необходимым классом
const makeElement = (tagName, className) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

//Функция проверяющая нажата ли клавиша ESC
const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomInteger, checkStringLength, getRandomArrayElement, makeElement, isEscapeKey};
