import {isEscapeKey} from './util.js';

const formDownloadPicture = document.querySelector('.img-upload__form');
const buttonUploadFile = document.querySelector('#upload-file');
const formEditImage = document.querySelector('.img-upload__overlay');
const buttonCloseFormEdit = document.querySelector('#upload-cancel');
// const buttonSubmitForm = formDownloadPicture.querySelector('img-upload__submit');
const hashtagValue = formDownloadPicture.querySelector('.text__hashtags');
const commentValue = formDownloadPicture.querySelector('.text__description');

const onFormEditEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFormEdit();
  }
};

function closeFormEdit () {
  formEditImage.classList.add('hidden');
  document.body.classList.remove('modal-open');
  removeListenerKeydownEsc();
  buttonUploadFile.value = '';
  buttonCloseFormEdit.removeEventListener('click', closeFormEdit);
}

buttonUploadFile.addEventListener('change', () => {
  formEditImage.classList.remove('hidden');
  document.body.classList.add('modal-open');
  addListenerKeydownEsc();
  buttonCloseFormEdit.addEventListener('click', closeFormEdit);
});

function addListenerKeydownEsc () {
  document.addEventListener('keydown', onFormEditEscKeydown);
}

function removeListenerKeydownEsc () {
  document.removeEventListener('keydown', onFormEditEscKeydown);
}

hashtagValue.addEventListener('focus', removeListenerKeydownEsc);
hashtagValue.addEventListener('blur', addListenerKeydownEsc);

commentValue.addEventListener('focus', removeListenerKeydownEsc);
commentValue.addEventListener('blur', addListenerKeydownEsc);

const pristine = new Pristine(formDownloadPicture);

formDownloadPicture.addEventListener('submit', (evt) => {
  evt.preventDefault();

  pristine.validate();
});

const checkHashtag = () => {
  let isValidHashtag = true;
  hashtagValue.addEventListener('input', () => {
    const arrHashtag = hashtagValue.value.split(' ');
    if (arrHashtag.lengt > 5) {
      isValidHashtag = false;
    } else if (arrHashtag.lengt <= 5 && arrHashtag.lengt >= 1){
      arrHashtag.forEach((hashtag) => {
        const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}/;
        if (!re.test(hashtag)) {
          isValidHashtag = false;
        } else {
          isValidHashtag = true;
        }
      });
    }
  });
  return isValidHashtag;
};

checkHashtag();
