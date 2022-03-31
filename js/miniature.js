import {showFullPhoto} from './modal.js';

const picturesBlockElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const miniaturesFilterElement = document.querySelector('.img-filters');

const fillMainPage = (miniatures) => {
  const pictureListFragment = document.createDocumentFragment();

  miniatures.forEach((miniature) => {
    const pictureElement = pictureTemplateElement.cloneNode(true);
    pictureElement.querySelector('img').src = miniature.url;
    pictureElement.querySelector('img').alt = miniature.description;
    pictureElement.querySelector('.picture__likes').textContent = String(miniature.likes);
    pictureElement.querySelector('.picture__comments').textContent = String(miniature.comments.length);
    showFullPhoto(pictureElement, miniature);
    pictureListFragment.appendChild(pictureElement);
  });
  picturesBlockElement.appendChild(pictureListFragment);
  miniaturesFilterElement.classList.remove('img-filters--inactive');
};

export {fillMainPage};
