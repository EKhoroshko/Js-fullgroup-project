import './sass/main.scss';
import getRefs from './js/get-refs.js';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
const refs = getRefs();

import { onOpenModal, onCloseModal } from './js/modal.js';
import cardMain from './templation/card.hbs';
import FilmsApiServise from './js/ApiServer';
import darkTheme from './js/darkTheme';
import { onOpenTeamModal, onCloseTeamModal } from './js/team-modal.js';

var debounce = require('debounce');
const filmsApiServise = new FilmsApiServise();

refs.inputRef.addEventListener('input', debounce(onInputSearch, 500));

refs.navLink[1].addEventListener('click', event => {
  if (event.target.classList.contains('navTitle')) {
    refs.navLink[1].classList.add('current');
    refs.navLink[0].classList.remove('current');
    refs.inputSearch.classList.add('is-hidden', 'js-modal');
    refs.headerOverlay.classList.add('library');
    refs.btnLibrary.classList.remove('is-hidden');
    clearfilms();
    renderCardMain(JSON.parse(localStorage.getItem('queue')));
  }
});

refs.navLink[0].addEventListener('click', event => {
  if (event.target.classList.contains('navTitle')) {
    refs.navLink[0].classList.add('current');
    refs.navLink[1].classList.remove('current');
    refs.inputSearch.classList.remove('is-hidden', 'js-modal');
    refs.headerOverlay.classList.remove('library');
    refs.btnLibrary.classList.add('is-hidden', 'js-modal');
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

export { renderCardMain };

// Pagination start

const container = document.getElementById('pagination');

const options = {
  totalItems: 20,
  itemsPerPage: 20,
  visiblePages: 10,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

const pagination = new Pagination('pagination', options);

pagination.on('afterMove', event => {
  const currentPage = event.page;
  console.log(currentPage);
  filmsApiServise.fetchFilms(currentPage).then(hits => {
    renderCardMain(hits.results);
  });
});

function createFilmsList(data) {
  filmsApiServise.fetchFilms(data).then(hits => {
    renderCardMain(hits.results);
    pagination.reset(hits.totalAmount);
    pagination.movePageTo(hits.pageNumber);
  });
}

function renderCardMain(results) {
  refs.$render.innerHTML = cardMain(results);
}

// Pagination end
