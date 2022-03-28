import './util.js';
import './miniature.js';
import './const.js';
import './modal.js';
import {closeFormEdit, setUserFormSubmit} from './user-form.js';
import {getData} from './api.js';

getData();

setUserFormSubmit(closeFormEdit);
