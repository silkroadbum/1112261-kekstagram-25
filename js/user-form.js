import {isEscapeKey} from './util.js';
import {REG_EXP_SPACES, MAX_VALUE_SCALE, VALUE_ONE_HUNDRED} from './const.js';
import {checkCountHashtags, checkUniqueHashtags, validateHashtag, validateComment} from './check-hashtags-comment.js';
import {imageUserElement, scaleImageElement} from './scale-image.js';
import {clearClassesImage, sliderElement, effectImageNoneElement} from './effect-image.js';
import {sendData} from './api.js';
import {showAlertSuccessForm, showAlertErrorForm, hideAlertSuccessForm, hideAlertErrorForm} from './alert-form.js';

const formDownloadPictureElement = document.querySelector('.img-upload__form');
const buttonUploadFileElement = document.querySelector('#upload-file');
const formEditImageElement = document.querySelector('.img-upload__overlay');
const buttonCloseFormElement = document.querySelector('#upload-cancel');
const hashtagsInputElement = formDownloadPictureElement.querySelector('.text__hashtags');
const commentInputElement = formDownloadPictureElement.querySelector('.text__description');
const submitButtonElement = formDownloadPictureElement.querySelector('.img-upload__submit');


const onFormEditEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFormEdit();
  }
};

function closeFormEdit () {
  formEditImageElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  removeListenerKeydownEsc();
  buttonUploadFileElement.value = '';
  hashtagsInputElement.value = '';
  commentInputElement.value = '';
  clearClassesImage();
  imageUserElement.style.filter = '';
  imageUserElement.style.transform = `scale(${MAX_VALUE_SCALE / VALUE_ONE_HUNDRED} )`;
  scaleImageElement.value = `${MAX_VALUE_SCALE}%`;
  sliderElement.style.visibility = 'hidden';
  effectImageNoneElement.checked = true;
  buttonCloseFormElement.removeEventListener('click', closeFormEdit);
}

buttonUploadFileElement.addEventListener('change', () => {
  formEditImageElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  addListenerKeydownEsc();
  buttonCloseFormElement.addEventListener('click', closeFormEdit);
});

function addListenerKeydownEsc() {
  document.addEventListener('keydown', onFormEditEscKeydown);
}

function removeListenerKeydownEsc() {
  document.removeEventListener('keydown', onFormEditEscKeydown);
}

hashtagsInputElement.addEventListener('focus', removeListenerKeydownEsc);
hashtagsInputElement.addEventListener('blur', addListenerKeydownEsc);

commentInputElement.addEventListener('focus', removeListenerKeydownEsc);
commentInputElement.addEventListener('blur', addListenerKeydownEsc);

const checkHashtags = (hashtagsString) => {
  if (!hashtagsString) {
    return true;
  }
  hashtagsString = hashtagsString.replace(REG_EXP_SPACES, ' ').trim();
  const strToLowerCase = hashtagsString.toLowerCase();
  const hashtags = strToLowerCase.split(' ');
  return checkCountHashtags(hashtags)
  && checkUniqueHashtags(hashtags)
  && validateHashtag(hashtags);
};

const pristine = new Pristine(formDownloadPictureElement, {
  classTo: 'validate__item',
  errorTextParent: 'validate__item',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

pristine.addValidator(hashtagsInputElement, checkHashtags, 'Hashtag error!');
pristine.addValidator(commentInputElement, validateComment, 'Не больше 140 символов!');

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
};

const setUserFormSubmit = (onSuccess) => {
  formDownloadPictureElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          showAlertSuccessForm();
          hideAlertSuccessForm();
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
