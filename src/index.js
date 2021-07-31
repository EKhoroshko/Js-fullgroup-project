import './sass/main.scss';
import getRefs from './js/get-refs.js';
const refs = getRefs();

// в консоли были ошибки я закомментировал
/* import { onOpenModal, onCloseModal } from './js/modal';
 */
import { onOpenModal, onCloseModal, onQueueList, onWatchedList  } from './js/modal.js';

import cardMain from './templation/card.hbs';
import FilmsApiServise from './js/ApiServer';

var debounce = require('debounce');
const filmsApiServise = new FilmsApiServise();

refs.inputRef.addEventListener('input', debounce(onInputSearch, 500));


refs.navLink[1].addEventListener('click', (event) => {
  if (event.target.classList.contains('navTitle')) {
      
    refs.navLink[1].classList.add('current');
    refs.navLink[0].classList.remove('current');
    refs.inputSearch.classList.add('is-hidden','js-modal');
    refs.headerOverlay.classList.add('library');
    refs.btnLibrary.classList.remove('is-hidden','js-modal');

  }
});

refs.navLink[0].addEventListener('click', (event) => {
  if (event.target.classList.contains('navTitle')) {
      
    refs.navLink[0].classList.add('current');
    refs.navLink[1].classList.remove('current');
    refs.inputSearch.classList.remove('is-hidden','js-modal');
    refs.headerOverlay.classList.remove('library');
    refs.btnLibrary.classList.add('is-hidden','js-modal');
    renderStartFilms();
  }
});


function renderStartFilms() {
  filmsApiServise.getFilm().then(hits => {
    renderCardMain(hits);
  });
}

function onInputSearch(e) {
  e.preventDefault();
  filmsApiServise.searchQuery = e.target.value;

  if (filmsApiServise.searchQuery === '') {
    clearfilms();
    renderStartFilms();
  } else {
    clearfilms();
    createFilmsList();
  }
}

function createFilmsList() {
  filmsApiServise.fetchFilms().then(hits => {
    renderCardMain(hits);
  });
}

function renderCardMain(results) {
  refs.$render.innerHTML = cardMain(results);
}

function clearfilms() {
  refs.$render.innerHTML = '';
}

renderStartFilms();