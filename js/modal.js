const modalWindow = document.querySelector('.big-picture');
const closeButton = modalWindow.querySelector('.cancel');
const commentCount = modalWindow.querySelector('.social__comment-count');
const commentLoader = modalWindow.querySelector('.comments-loader');

closeButton.addEventListener('click', () => {
  modalWindow.classList.add('hidden');
});

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    modalWindow.classList.add('hidden');
  }
});

const showFullPhoto = (miniature) => {
  miniature.addEventListener('click', () => {
    modalWindow.classList.remove('hidden');
    commentCount.classList.add('hidden');
    commentLoader.classList.add('hidden');
    document.body.classList.add('modal-open');
  });
};

export {showFullPhoto};
