const modalWindow = document.querySelector('.big-picture');
const closeButton = modalWindow.querySelector('.cancel');
modalWindow.classList.remove('hidden');

closeButton.addEventListener('click', () => {
  modalWindow.classList.add('hidden');
});

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    modalWindow.classList.add('hidden');
  }
});
