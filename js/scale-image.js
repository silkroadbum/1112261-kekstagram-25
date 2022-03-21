import {MAX_VALUE_SCALE, MIN_VALUE_SCALE, SCALE_STEP, NOTATION, VALUE_ONE_HUNDRED} from './const.js';

const buttonZoomIn = document.querySelector('.scale__control--bigger');
const buttonZoomOut = document.querySelector('.scale__control--smaller');
const scaleImage = document.querySelector('.scale__control--value');
const uploadedImage = document.querySelector('.img-upload__preview');
const imageUser = uploadedImage.querySelector('img');

buttonZoomIn.addEventListener('click', () => {
  let scaleValue = parseInt(scaleImage.value, NOTATION);
  if (!(scaleValue >= MAX_VALUE_SCALE)) {
    scaleValue += SCALE_STEP;
    scaleImage.value = `${scaleValue}%`;
    imageUser.style.transform = `scale(${scaleValue / VALUE_ONE_HUNDRED})`;
  }
});

buttonZoomOut.addEventListener('click', () => {
  let scaleValue = parseInt(scaleImage.value, NOTATION);
  if (!(scaleValue <= MIN_VALUE_SCALE)) {
    scaleValue -= SCALE_STEP;
    scaleImage.value = `${scaleValue}%`;
    imageUser.style.transform = `scale(${scaleValue / VALUE_ONE_HUNDRED})`;
  }
});

export {imageUser};
