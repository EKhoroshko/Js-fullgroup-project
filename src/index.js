import './sass/main.scss';
import getRefs from './js/get-refs.js';
import Pagination from 'tui-pagination';
const refs = getRefs();

import { onOpenModal, onCloseModal } from './js/modal.js';
import cardMain from './templation/card.hbs';
import FilmsApiServise from './js/ApiServer';
import darkTheme from './js/darkTheme';
import { onOpenTeamModal, onCloseTeamModal } from './js/team-modal.js';

var debounce = require('debounce');
const filmsApiServise = new FilmsApiServise();
const container = document.getElementById('pagination');

const options = {
  totalItems: 20,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
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

const pagination = new Pagination(container, options);

refs.inputRef.addEventListener('input', debounce(onInputSearch, 500));

refs.navLink[1].addEventListener('click', event => {
  if (event.target.classList.contains('navTitle')) {
    refs.navLink[1].classList.add('current');
    refs.navLink[0].classList.remove('current');
    refs.inputSearch.classList.add('is-hidden', 'js-modal');
    refs.headerOverlay.classList.add('library');
    refs.btnLibrary.classList.remove('is-hidden','js-modal');
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

refs.logotype.addEventListener('click', event => {
  if (event.target) {
    refs.navLink[0].classList.add('current');
    refs.navLink[1].classList.remove('current');
    refs.inputSearch.classList.remove('is-hidden', 'js-modal');
    refs.headerOverlay.classList.remove('library');
    refs.btnLibrary.classList.add('is-hidden', 'js-modal');
    renderStartFilms();
  }
});

pagination.on('afterMove', event => {
  const currentPage = event.page;
  filmsApiServise.fetchFilms(currentPage).then(hits => {
    renderCardMain(hits.results);
  });
});

function renderStartFilms() {
  refs.$loader.classList.add('show');
  refs.$loader.classList.remove('hide');
  filmsApiServise.getFilm().then(hits => {
    renderCardMain(hits.results);
    pagination.reset(0);
    refs.$loader.classList.add('hide');
    refs.$loader.classList.remove('show');
  });
}
renderStartFilms();

function createFilmsList(data) {
  refs.$loader.classList.add('show');
  refs.$loader.classList.remove('hide');
  filmsApiServise.fetchFilms(data).then(hits => {
    renderCardMain(hits.results);
    pagination.reset(hits.totalAmount);
    // pagination.movePageTo(hits.pageNumber);
    refs.$loader.classList.add('hide');
    refs.$loader.classList.remove('show');
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

function renderCardMain(results) {
  refs.$render.innerHTML = cardMain(results);
}

function clearfilms() {
  refs.$render.innerHTML = '';
}


export { renderCardMain };

// Pagination  start



function renderCardMain(results) {
  refs.$render.innerHTML = cardMain(results);
}

// Pagination end