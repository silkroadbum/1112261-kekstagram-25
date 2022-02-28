// Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

getRandomInteger(1, 5);

//Функция проверки длины строки
const checkStringLength = (testString, maxLength) => testString.length <= maxLength;

checkStringLength('Анатолий', 10);

let idDescription = 0;

const PHOTO_DESCRIPTION_COUNT = 25;
const MIN_VALUE_OF_LIKES = 15;
const MAX_VALUE_OF_LIKES = 200;
const MIN_VALUE_AVATAR = 1;
const MAX_VALUE_AVATAR = 6;

const NAMES = [
  'Анатолий',
  'Василий',
  'Евгений',
  'Максим',
  'Надежда',
  'Светлана',
  'Егор',
  'Мария',
  'Александр',
  'Дмитрий'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'В Моксве',
  'На море',
  'Осень',
  'Гуляю',
  'Красота',
  'На чиле'
];

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createComment = () => ({
  id: idDescription,
  avatar: `img/avatar-${getRandomInteger(MIN_VALUE_AVATAR, MAX_VALUE_AVATAR)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createPhotoDescription = () => {
  idDescription++;
  return {
    id: idDescription,
    url: `photos/${idDescription}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(MIN_VALUE_OF_LIKES, MAX_VALUE_OF_LIKES),
    comments: createComment()
  };
};

const photoDescriptions = Array.from({length: PHOTO_DESCRIPTION_COUNT}, createPhotoDescription);
throw photoDescriptions;
