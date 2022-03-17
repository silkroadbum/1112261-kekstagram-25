import {REG_EXP_HASHTAG, MAX_LENGTH_COUNT_HASHTAGS} from './const.js';

const checkCountHashtags =  (array) => array.length <= MAX_LENGTH_COUNT_HASHTAGS;

const checkUniqueHashtags = (array) => {
  for (let i = 0; i < array.length - 1; i++) {
    const indexUniqElement = array.indexOf(array[i], i + 1);
    if (indexUniqElement >= 0) {
      return false;
    }
  }
  return true;
};

const validateHashtag = (array) => {
  for (let i = 0; i < array.length; i++) {
    if (!REG_EXP_HASHTAG.test(array[i])) {
      return false;
    }
  }
  return true;
};

export {checkCountHashtags, checkUniqueHashtags, validateHashtag};

// хэш-тег начинается с символа # (решётка);
// строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
// хеш-тег не может состоять только из одной решётки;
// максимальная длина одного хэш-тега 20 символов, включая решётку;
// хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
// хэш-теги разделяются пробелами;
// один и тот же хэш-тег не может быть использован дважды;
// +нельзя указать больше пяти хэш-тегов;
// +хэш-теги необязательны;
// +если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
