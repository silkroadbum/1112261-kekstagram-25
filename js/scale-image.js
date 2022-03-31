import {MAX_VALUE_SCALE, MIN_VALUE_SCALE, SCALE_STEP, NOTATION, VALUE_ONE_HUNDRED} from './const.js';

const buttonZoomInElement = document.querySelector('.scale__control--bigger');
const buttonZoomOutElement = document.querySelector('.scale__control--smaller');
const scaleImageElement = document.querySelector('.scale__control--value');
const uploadedImageElement = document.querySelector('.img-upload__preview');
const imageUserElement = uploadedImageElement.querySelector('img');

buttonZoomInElement.addEventListener('click', () => {
  let scaleValue = parseInt(scaleImageElement.value, NOTATION);
  if (!(scaleValue >= MAX_VALUE_SCALE)) {
    scaleValue += SCALE_STEP;
    scaleImageElement.value = `${scaleValue}%`;
    imageUserElement.style.transform = `scale(${scaleValue / VALUE_ONE_HUNDRED})`;
  }
});

buttonZoomOutElement.addEventListener('click', () => {
  let scaleValue = parseInt(scaleImageElement.value, NOTATION);
  if (!(scaleValue <= MIN_VALUE_SCALE)) {
    scaleValue -= SCALE_STEP;
    scaleImageElement.value = `${scaleValue}%`;
    imageUserElement.style.transform = `scale(${scaleValue / VALUE_ONE_HUNDRED})`;
  }
});

export {imageUserElement, scaleImageElement};
