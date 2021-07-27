import './sass/main.scss';


import { toggleModal } from './js/modal';


import { cardMain } from './templation/card.hbs';
import FilmsApiServise from './js/ApiServer';

const $render = document.querySelector('.gallery-list');
const inputRef = document.querySelector('.modal-form-input');
const filmsApiServise = new FilmsApiServise();

inputRef.addEventListener('input', onInputSearch);

function renderCardMain() {
  $render.insertAdjacentHTML('beforeend', cardMain());
}

function onInputSearch(e) {
  e.preventDefault();
  filmsApiServise.searchQuery = e.target.value;
  filmsApiServise.fetchFilmsByKeyWord();
}
