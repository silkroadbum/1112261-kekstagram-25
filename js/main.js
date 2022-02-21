// Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

getRandomInteger(1, 5);

//Функция проверки длины строки
const checkStringLength = (testString, maxLength) => testString.length <= maxLength;

checkStringLength('Анатолий', 10);
