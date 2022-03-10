const modalWindow = document.querySelector('.big-picture');
const closeButton = modalWindow.querySelector('.cancel');


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
  });
};

export {showFullPhoto};
