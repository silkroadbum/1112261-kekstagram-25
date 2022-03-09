// Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

//Функция проверки длины строки
const checkStringLength = (testString, maxLength) => testString.length <= maxLength;

//Функция получения рандомного элемента из массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export {getRandomInteger, checkStringLength, getRandomArrayElement};
