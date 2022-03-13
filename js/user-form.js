import {isEscapeKey} from './util.js';

const formDownloadPicture = document.querySelector('.img-upload__form');
const buttonUploadFile = document.querySelector('#upload-file');
const formEditImage = document.querySelector('.img-upload__overlay');
const buttonCloseFormEdit = document.querySelector('#upload-cancel');

buttonCloseFormEdit.addEventListener('click', closeFormEdit);

const onFormEditEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFormEdit();
  }
};

function closeFormEdit () {
  formEditImage.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onFormEditEscKeydown);
  buttonUploadFile.value = '';
}

buttonUploadFile.addEventListener('change', () => {
  formEditImage.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onFormEditEscKeydown);
});

const pristine = new Pristine(formDownloadPicture);

formDownloadPicture.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    throw 'Можно отправлять';
  } else {
    throw 'Строка не валидна';
  }
});
