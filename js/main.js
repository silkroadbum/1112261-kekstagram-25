import './util.js';
import {fillMainPage} from './miniature.js';
import {sortMiniatures} from './filter-miniatures.js';
import './const.js';
import './modal.js';
import {closeFormEdit, setUserFormSubmit} from './user-form.js';
import {getData} from './api.js';

getData((pictures)=> {
  console.log(pictures);
  fillMainPage(pictures);
  sortMiniatures(pictures);
});

setUserFormSubmit(closeFormEdit);
