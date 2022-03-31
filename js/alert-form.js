import {ALERT_SHOW_TIME} from './const.js';
import {isEscapeKey} from './util.js';

const successTemplateElement = document.querySelector('#success').content.querySelector('.success');
const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');

const onAlertSuccessEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideSuccessAlert();
  }
};

const addListenerSuccess = () => {
  document.addEventListener('keydown', onAlertSuccessEscKeydown);
};

const removeListenerSuccess = () => {
  document.removeEventListener('keydown', onAlertSuccessEscKeydown);
};

function hideSuccessAlert() {
  document.querySelector('.success').remove();
  removeListenerSuccess();
}

const onAlertErrorEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideErrorAlert();
  }
};

const addListenerError = () => {
  document.addEventListener('keydown', onAlertErrorEscKeydown);
};

const removeListenerError = () => {
  document.removeEventListener('keydown', onAlertErrorEscKeydown);
};

function hideErrorAlert() {
  document.querySelector('.error').remove();
  removeListenerError();
}

const showAlertSuccessForm = () => {
  const message = successTemplateElement.cloneNode(true);
  document.body.appendChild(message);
};


const hideAlertSuccessForm = () => {
  const buttonHideAlert = document.querySelector('.success__button');
  buttonHideAlert.addEventListener('click', () => {
    hideSuccessAlert();
  });
  addListenerSuccess();
  const successModal = document.querySelector('.success');
  successModal.addEventListener('click', (evt) => {
    if (evt.target.contains(successModal)) {
      hideSuccessAlert();
    }
  });
  setTimeout(() => {
    hideSuccessAlert();
  }, ALERT_SHOW_TIME);
};

const showAlertErrorForm = () => {
  const message = errorTemplateElement.cloneNode(true);
  document.body.appendChild(message);
  addListenerError();
};

const hideAlertErrorForm = () => {
  const buttonHideAlert = document.querySelector('.error__button');
  buttonHideAlert.addEventListener('click', () => {
    hideErrorAlert();
  });
  addListenerError();
  const successModal = document.querySelector('.error');
  successModal.addEventListener('click', (evt) => {
    if (evt.target.contains(successModal)) {
      hideErrorAlert();
    }
  });
  setTimeout(() => {
    hideErrorAlert();
  }, ALERT_SHOW_TIME);
};

export {showAlertSuccessForm, showAlertErrorForm, hideAlertSuccessForm, hideAlertErrorForm};
