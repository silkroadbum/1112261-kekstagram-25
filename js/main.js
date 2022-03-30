import './util.js';
import {showFilteredMiniatures, fillMainPage} from './miniature.js';
import './const.js';
import './modal.js';
import {closeFormEdit, setUserFormSubmit} from './user-form.js';
import {getData} from './api.js';

getData((pictures)=> {
  fillMainPage(pictures);
  showFilteredMiniatures(() => fillMainPage(pictures), pictures);
});

setUserFormSubmit(closeFormEdit);
