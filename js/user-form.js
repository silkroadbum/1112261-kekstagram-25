const formDownloadNewPicture = document.querySelector('.img-upload__form');

const pristine = new Pristine(formDownloadNewPicture);

formDownloadNewPicture.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    throw 'Можно отправлять';
  } else {
    throw 'Строка не валидна';
  }
});
