import {isEscapeKey, isEnterKey} from './util.js';
import {fillCommentsFiled} from './fill-comments.js';
import {MAX_VISIBLE_COMMENTS, START_ARRAY_COMMENTS} from './const.js';

const modalWindow = document.querySelector('.big-picture');
const closeButton = modalWindow.querySelector('.cancel');
const socialCommentCount = modalWindow.querySelector('.social__comment-count');
const commentLoader = modalWindow.querySelector('.comments-loader');
const bigPicture = modalWindow.querySelector('.big-picture__img');
const likesCount = modalWindow.querySelector('.likes-count');
const commentCount = socialCommentCount.querySelector('.comments-count');
const descriptionFullPhoto = modalWindow.querySelector('.social__caption');
const commentsList = document.querySelector('.social__comments');
const commentsListFragment = document.createDocumentFragment();
const commentsCounter = modalWindow.querySelector('#comment-counter');

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalWindow();
  }
};

function closeModalWindow () {
  modalWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscKeydown);
  commentsList.innerHTML = '';
}

closeButton.addEventListener('click', () => {
  closeModalWindow();
});

closeButton.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeModalWindow();
  }
});

const showCommentsLoader = (array, value) => {
  if (array.length <= value) {
    commentLoader.classList.add('hidden');
  } else {
    commentLoader.classList.remove('hidden');
  }
};

const showFullPhoto = (miniature, pictureElement) => {
  miniature.addEventListener('click', () => {
    modalWindow.classList.remove('hidden');
    // socialCommentCount.classList.add('hidden');
    // commentLoader.classList.add('hidden');
    document.body.classList.add('modal-open');
    bigPicture.querySelector('img').src = pictureElement.url;
    bigPicture.querySelector('img').alt = pictureElement.description;
    likesCount.textContent = String(pictureElement.likes);
    commentCount.textContent = String(pictureElement.comments.length);
    descriptionFullPhoto.textContent = pictureElement.description;
    const cloneComments = pictureElement.comments.slice(0);
    showCommentsLoader(cloneComments, MAX_VISIBLE_COMMENTS);
    let visibleComments = cloneComments.splice(START_ARRAY_COMMENTS, MAX_VISIBLE_COMMENTS);
    let counterComments = visibleComments.length;
    commentsCounter.textContent = counterComments;
    commentLoader.addEventListener('click', () => {
      visibleComments = cloneComments.splice(START_ARRAY_COMMENTS, MAX_VISIBLE_COMMENTS);
      fillCommentsFiled(visibleComments, commentsListFragment);
      commentsList.appendChild(commentsListFragment);
      showCommentsLoader(cloneComments, START_ARRAY_COMMENTS);
      counterComments += visibleComments.length;
      commentsCounter.textContent = counterComments;
    });
    fillCommentsFiled(visibleComments, commentsListFragment);
    commentsList.appendChild(commentsListFragment);
    document.addEventListener('keydown', onModalEscKeydown);
  });
};

export {showFullPhoto};
