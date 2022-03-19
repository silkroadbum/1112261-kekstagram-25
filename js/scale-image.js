const buttonZoomIn = document.querySelector('.scale__control--bigger');
const buttonZoomOut = document.querySelector('.scale__control--smaller');
const scaleImage = document.querySelector('.scale__control--value');
const uploadedImage = document.querySelector('.img-upload__preview');

buttonZoomIn.addEventListener('click', () => {
  let scaleValue = parseInt(scaleImage.value, 10);
  if (!(scaleValue >= 100)) {
    scaleValue += 25;
    scaleImage.value = `${scaleValue}%`;
    uploadedImage.querySelector('img').style.transform = `scale(${scaleValue / 100})`;
  }
});

buttonZoomOut.addEventListener('click', () => {
  let scaleValue = parseInt(scaleImage.value, 10);
  if (!(scaleValue <= 25)) {
    scaleValue -= 25;
    scaleImage.value = `${scaleValue}%`;
    uploadedImage.querySelector('img').style.transform = `scale(${scaleValue / 100})`;
  }
});
