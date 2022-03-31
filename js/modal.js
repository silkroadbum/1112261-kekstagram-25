import {isEscapeKey, isEnterKey} from './util.js';
import {fillCommentsFiled} from './fill-comments.js';
import {MAX_VISIBLE_COMMENTS, START_ARRAY_COMMENTS} from './const.js';

const modalWindowElement = document.querySelector('.big-picture');
const closeButtonElement = modalWindowElement.querySelector('.cancel');
const socialCommentCountElement = modalWindowElement.querySelector('.social__comment-count');
const commentLoaderElement = modalWindowElement.querySelector('.comments-loader');
const bigPictureElement = modalWindowElement.querySelector('.big-picture__img');
const likesCountElement = modalWindowElement.querySelector('.likes-count');
const commentCountElement = socialCommentCountElement.querySelector('.comments-count');
const descriptionFullPhotoElement = modalWindowElement.querySelector('.social__caption');
const commentsListElement = document.querySelector('.social__comments');
const commentsListFragment = document.createDocumentFragment();
const commentsCounterElement = modalWindowElement.querySelector('#comment-counter');

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalWindow();
  }
};

function closeModalWindow () {
  modalWindowElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscKeydown);
  commentsListElement.innerHTML = '';
}

closeButtonElement.addEventListener('click', () => {
  closeModalWindow();
});

closeButtonElement.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeModalWindow();
  }
});

const showCommentsLoader = (array, value) => {
  if (array.length <= value) {
    commentLoaderElement.classList.add('hidden');
  } else {
    commentLoaderElement.classList.remove('hidden');
  }
};

const showFullPhoto = (miniature, pictureElement) => {
  miniature.addEventListener('click', () => {
    modalWindowElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    bigPictureElement.querySelector('img').src = pictureElement.url;
    bigPictureElement.querySelector('img').alt = pictureElement.description;
    likesCountElement.textContent = String(pictureElement.likes);
    commentCountElement.textContent = String(pictureElement.comments.length);
    descriptionFullPhotoElement.textContent = pictureElement.description;
    const cloneComments = pictureElement.comments.slice(0);
    showCommentsLoader(cloneComments, MAX_VISIBLE_COMMENTS);
    let visibleComments = cloneComments.splice(START_ARRAY_COMMENTS, MAX_VISIBLE_COMMENTS);
    let counterComments = visibleComments.length;
    commentsCounterElement.textContent = counterComments;
    commentLoaderElement.addEventListener('click', () => {
      visibleComments = cloneComments.splice(START_ARRAY_COMMENTS, MAX_VISIBLE_COMMENTS);
      fillCommentsFiled(visibleComments, commentsListFragment);
      commentsListElement.appendChild(commentsListFragment);
      showCommentsLoader(cloneComments, START_ARRAY_COMMENTS);
      counterComments += visibleComments.length;
      commentsCounterElement.textContent = counterComments;
    });
    fillCommentsFiled(visibleComments, commentsListFragment);
    commentsListElement.appendChild(commentsListFragment);
    document.addEventListener('keydown', onModalEscKeydown);
  });
};

export {showFullPhoto};
