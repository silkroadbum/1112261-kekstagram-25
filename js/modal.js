const modalWindow = document.querySelector('.big-picture');
const closeButton = modalWindow.querySelector('.cancel');
const socialCommentCount = modalWindow.querySelector('.social__comment-count');
const commentLoader = modalWindow.querySelector('.comments-loader');
const bigPicture = modalWindow.querySelector('.big-picture__img');
const likesCount = modalWindow.querySelector('.likes-count');
const commentCount = socialCommentCount.querySelector('.comments-count');
const descriptionFullPhoto = modalWindow.querySelector('.social__caption');

closeButton.addEventListener('click', () => {
  modalWindow.classList.add('hidden');
});

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    modalWindow.classList.add('hidden');
  }
});

const showFullPhoto = (miniature, pictureElement) => {
  miniature.addEventListener('click', () => {
    modalWindow.classList.remove('hidden');
    socialCommentCount.classList.add('hidden');
    commentLoader.classList.add('hidden');
    document.body.classList.add('modal-open');
    bigPicture.querySelector('img').src = pictureElement.url;
    likesCount.textContent = pictureElement.likes;
    commentCount.textContent = pictureElement.comments.length;
    descriptionFullPhoto.textContent = pictureElement.description;
  });
};

export {showFullPhoto};
