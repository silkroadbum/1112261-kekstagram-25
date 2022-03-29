import {ALERT_SHOW_TIME} from './const.js';
import {isEscapeKey} from './util.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const onAlertSuccessEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideSuccessAlert();
  }
};

function addListenerSuccess() {
  document.addEventListener('keydown', onAlertSuccessEscKeydown);
}

function removeListenerSuccess() {
  document.removeEventListener('keydown', onAlertSuccessEscKeydown);
}

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

function addListenerError() {
  document.addEventListener('keydown', onAlertErrorEscKeydown);
}

function removeListenerError() {
  document.removeEventListener('keydown', onAlertErrorEscKeydown);
}

function hideErrorAlert() {
  document.querySelector('.error').remove();
  removeListenerError();
}

const showAlertSuccesForm = () => {
  const message = successTemplate.cloneNode(true);
  document.body.appendChild(message);
};


function hideAlertSuccesForm () {
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
}

const showAlertErrorForm = () => {
  const message = errorTemplate.cloneNode(true);
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

export {showAlertSuccesForm, showAlertErrorForm, hideAlertSuccesForm, hideAlertErrorForm};
