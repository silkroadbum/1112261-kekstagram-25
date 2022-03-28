import {showAlert} from './util.js';
import {fillMainPage} from './miniature.js';
import {MESSAGE_DOWNLOAD_MINIATURES, URL_MINIATURES, URL_SUBMIT_FORM} from './const.js';

const getData = () => {
  fetch(URL_MINIATURES)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((pictures) => {
      fillMainPage(pictures);
    }).catch(() => {
      showAlert(MESSAGE_DOWNLOAD_MINIATURES);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    URL_SUBMIT_FORM,
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onSuccess();
      onFail();
    }
  }).catch(() => {
    onSuccess();
    onFail();
  });
};

export {getData, sendData};
