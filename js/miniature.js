import {showFullPhoto} from './modal.js';
import {ACTIVE_CLASS_FILTER_BUTTON} from './const.js';
import {toggleClassActive} from './util.js';

const picturesBlock = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const miniaturesFilter = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');
const filterButtons = document.querySelectorAll('.img-filters__button');

const compareLikesMiniature = (miniatureA, miniatureB) => {
  const likesA = miniatureA.comments.length;
  const likesB = miniatureB.comments.length;
  return likesB - likesA;
};

const showFilteredMiniatures = (cb, array) => {
  filtersForm.addEventListener('click', (evt) => {
    toggleClassActive(filterButtons, evt, ACTIVE_CLASS_FILTER_BUTTON);
    if (evt.target.id === 'filter-discussed') {
      array.sort(compareLikesMiniature);
    }
    if (evt.target.id === 'filter-random') {
      array.splice(10);
    }
    cb();
  });
};

const deleteMiniatures = () => {
  const miniatures = document.querySelectorAll('.picture');
  miniatures.forEach((picture) => picture.remove());
};

const fillMainPage = (miniatures) => {
  const pictureListFragment = document.createDocumentFragment();

  miniatures.forEach((miniature) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('img').src = miniature.url;
    pictureElement.querySelector('img').alt = miniature.description;
    pictureElement.querySelector('.picture__likes').textContent = String(miniature.likes);
    pictureElement.querySelector('.picture__comments').textContent = String(miniature.comments.length);
    showFullPhoto(pictureElement, miniature);
    pictureListFragment.appendChild(pictureElement);
  });
  deleteMiniatures();
  picturesBlock.appendChild(pictureListFragment);
  miniaturesFilter.classList.remove('img-filters--inactive');
};

export {fillMainPage, showFilteredMiniatures};
