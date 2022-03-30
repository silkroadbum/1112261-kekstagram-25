import {showFullPhoto} from './modal.js';

const picturesBlock = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureListFragment = document.createDocumentFragment();


const fillMainPage = (miniatures) => {
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
};

export {fillMainPage};
