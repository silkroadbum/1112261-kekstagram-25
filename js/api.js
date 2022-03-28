import {showAlert} from './util.js';
import {fillMainPage} from './miniature.js';
import {MESSAGE_DOWNLOAD_MINIATURES, URL_MINIATURES} from './const.js';

const downloadMiniatures = () => {
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

export {downloadMiniatures};
