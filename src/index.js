import './sass/main.scss';
import getRefs from './js/get-refs.js';
const refs = getRefs();

// в консоли были ошибки я закомментировал
//import { toggleModal } from './js/modal';

import cardMain from './templation/card.hbs';
import FilmsApiServise from './js/ApiServer';

var debounce = require('debounce');
const filmsApiServise = new FilmsApiServise();

refs.inputRef.addEventListener('input', debounce(onInputSearch, 500));

function renderStartFilms() {
  filmsApiServise.getFilm().then(hits => {
    renderCardMain(hits);
  });
}
renderStartFilms();
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
