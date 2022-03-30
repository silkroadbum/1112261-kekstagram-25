import {isEscapeKey} from './util.js';
import {REG_EXP_SPACES, MAX_VALUE_SCALE, VALUE_ONE_HUNDRED} from './const.js';
import {checkCountHashtags, checkUniqueHashtags, validateHashtag, validateComment} from './check-hashtags-comment.js';
import {imageUser, scaleImage} from './scale-image.js';
import {clearClassesImage, sliderElement, effectImageNone} from './effect-image.js';
import {sendData} from './api.js';
import {showAlertSuccesForm, showAlertErrorForm, hideAlertSuccesForm, hideAlertErrorForm} from './alert-form.js';

const formDownloadPicture = document.querySelector('.img-upload__form');
const buttonUploadFile = document.querySelector('#upload-file');
const formEditImage = document.querySelector('.img-upload__overlay');
const buttonCloseFormEdit = document.querySelector('#upload-cancel');
const hashtagsInput = formDownloadPicture.querySelector('.text__hashtags');
const commentInput = formDownloadPicture.querySelector('.text__description');
const submitButton = formDownloadPicture.querySelector('.img-upload__submit');


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
  hashtagsInput.value = '';
  commentInput.value = '';
  clearClassesImage();
  imageUser.style.filter = '';
  imageUser.style.transform = `scale(${MAX_VALUE_SCALE / VALUE_ONE_HUNDRED} )`;
  scaleImage.value = `${MAX_VALUE_SCALE}%`;
  sliderElement.style.visibility = 'hidden';
  effectImageNone.checked = true;
  buttonCloseFormEdit.removeEventListener('click', closeFormEdit);
}

buttonUploadFile.addEventListener('change', () => {
  formEditImage.classList.remove('hidden');
  document.body.classList.add('modal-open');
  addListenerKeydownEsc();
  buttonCloseFormEdit.addEventListener('click', closeFormEdit);
});

function addListenerKeydownEsc() {
  document.addEventListener('keydown', onFormEditEscKeydown);
}

function removeListenerKeydownEsc() {
  document.removeEventListener('keydown', onFormEditEscKeydown);
}

hashtagsInput.addEventListener('focus', removeListenerKeydownEsc);
hashtagsInput.addEventListener('blur', addListenerKeydownEsc);

commentInput.addEventListener('focus', removeListenerKeydownEsc);
commentInput.addEventListener('blur', addListenerKeydownEsc);

function checkHashtags (hashtagsString) {
  if (!hashtagsString) {
    return true;
  }
  hashtagsString = hashtagsString.replace(REG_EXP_SPACES, ' ').trim();
  const strToLowerCase = hashtagsString.toLowerCase();
  const hashtags = strToLowerCase.split(' ');
  return checkCountHashtags(hashtags)
  && checkUniqueHashtags(hashtags)
  && validateHashtag(hashtags);
}

const pristine = new Pristine(formDownloadPicture, {
  classTo: 'validate__item',
  errorTextParent: 'validate__item',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

pristine.addValidator(hashtagsInput, checkHashtags, 'Hashtag error!');
pristine.addValidator(commentInput, validateComment, 'Не больше 140 символов!');

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

const setUserFormSubmit = (onSuccess) => {
  formDownloadPicture.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          showAlertSuccesForm();
          hideAlertSuccesForm();
          unblockSubmitButton();
        },
        () => {
          onSuccess();
          showAlertErrorForm();
          hideAlertErrorForm();
          unblockSubmitButton();
        },
        new FormData(evt.target)
      );
    }
  });
};

export {setUserFormSubmit, closeFormEdit};
