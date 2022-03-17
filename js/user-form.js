import {isEscapeKey} from './util.js';
import {REG_EXP_SPACES, MAX_LENGTH_COMMENT} from './const.js';
import {checkCountHashtags, checkUniqueHashtags, validateHashtag} from './check-hashtags.js';

const formDownloadPicture = document.querySelector('.img-upload__form');
const buttonUploadFile = document.querySelector('#upload-file');
const formEditImage = document.querySelector('.img-upload__overlay');
const buttonCloseFormEdit = document.querySelector('#upload-cancel');
const buttonSubmitForm = formDownloadPicture.querySelector('.img-upload__submit');
const hashtagsInput = formDownloadPicture.querySelector('.text__hashtags');
const commentInput = formDownloadPicture.querySelector('.text__description');

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

hashtagsInput.addEventListener('focus', removeListenerKeydownEsc);
hashtagsInput.addEventListener('blur', addListenerKeydownEsc);

commentInput.addEventListener('focus', removeListenerKeydownEsc);
commentInput.addEventListener('blur', addListenerKeydownEsc);

const validateComment = (value) => {
  if (value.length <= MAX_LENGTH_COMMENT) {
    buttonSubmitForm.disabled = false;
    return true;
  }
  buttonSubmitForm.disabled = true;
  return false;
};

const pristine = new Pristine(formDownloadPicture, {
  classTo: 'validate__item',
  errorTextParent: 'validate__item',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

pristine.addValidator(hashtagsInput, checkHashtags, 'Hashtag error!');
pristine.addValidator(commentInput, validateComment, 'Не больше 140 символов!');

function checkHashtags (hashtagsString) {
  if (!hashtagsString) {
    return true;
  }
  hashtagsString = hashtagsString.replace(REG_EXP_SPACES, ' ').trim();
  const strToLowerCase = hashtagsString.toLowerCase();
  const hashtags = strToLowerCase.split(' ');
  if (checkCountHashtags(hashtags)
    && checkUniqueHashtags(hashtags)
    && validateHashtag(hashtags)) {
    buttonSubmitForm.disabled = false;
    return true;
  }
  buttonSubmitForm.disabled = true;
  return false;
}
