import {showFullPhoto} from './modal.js';

const picturesBlock = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const miniaturesFilter = document.querySelector('.img-filters');

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
  picturesBlock.appendChild(pictureListFragment);
  miniaturesFilter.classList.remove('img-filters--inactive');
};

export {fillMainPage};
