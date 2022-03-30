import {toggleClassActive, getRandomInteger, debounce} from './util.js';
import {ACTIVE_CLASS_FILTER_BUTTON, RERENDER_DELAY} from './const.js';
import {fillMainPage} from './miniature.js';


const filtersForm = document.querySelector('.img-filters__form');
const filterButtons = document.querySelectorAll('.img-filters__button');


//Функция для передачи в функцию сортировки
const compareLikesMiniature = (miniatureA, miniatureB) => {
  const likesA = miniatureA.comments.length;
  const likesB = miniatureB.comments.length;
  return likesB - likesA;
};

//Функция удаления всех миниатюр со страницы
const deleteMiniatures = () => {
  const miniatures = document.querySelectorAll('.picture');
  miniatures.forEach((picture) => picture.remove());
};

//Функция получения 10 рандомных миниатюр
const getRandomMiniatures = (data) => {
  const randomMiniaturesId = [];
  while (randomMiniaturesId.length < 10) {
    const filter = getRandomInteger(0, (data.length - 1));
    if (randomMiniaturesId.includes(filter) === false) {
      randomMiniaturesId.push(filter);
    }
  }
  const randomMiniatures = [];
  randomMiniaturesId.forEach((element) => {
    randomMiniatures.push(data[element]);
  });
  fillMainPage(randomMiniatures);
};

//Функция сортировки массива миниатюр по количеству комментариев от большего к меньшему
const getDiscussedPhotos = (miniatures) => {
  fillMainPage(miniatures.sort(compareLikesMiniature));
};

//Функция отрисовки массива в зависимости от выбранного фильтра
const onFilterChange = (filterId, miniatures) => {
  if (filterId === 'filter-random') {
    deleteMiniatures();
    getRandomMiniatures(miniatures);
  } else if (filterId === 'filter-discussed') {
    deleteMiniatures();
    getDiscussedPhotos(miniatures);
  } else {
    deleteMiniatures();
    fillMainPage(miniatures);
  }
};


const sortMiniatures = (miniatures) => {
  const handleChange = debounce((evt) => onFilterChange(evt.target.id, miniatures), RERENDER_DELAY);

  filtersForm.addEventListener('click', (evt) => {
    toggleClassActive(filterButtons, evt, ACTIVE_CLASS_FILTER_BUTTON);
    handleChange(evt);
  });
};

export {sortMiniatures};
