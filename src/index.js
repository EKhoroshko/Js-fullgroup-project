import './sass/main.scss';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import { defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import "@pnotify/confirm/dist/PNotifyConfirm.css";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import getRefs from './js/get-refs.js';
import { onOpenModal, onCloseModal, wherIAm } from './js/modal.js';
import cardMain from './templation/card.hbs';
import FilmsApiServise from './js/ApiServer';
import darkTheme from './js/darkTheme';
import { onOpenTeamModal, onCloseTeamModal } from './js/team-modal.js';
import Pagination from 'tui-pagination';

const refs = getRefs();
defaultModules.set(PNotifyMobile, {});
var debounce = require('debounce');
const filmsApiServise = new FilmsApiServise();
const container = document.getElementById('pagination');

const options = {
  totalItems: 20,
  itemsPerPage: 20,
  visiblePages: 5,
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

refs.inputRef.addEventListener('input', debounce(onInputSearch, 1000));

refs.navLink[1].addEventListener('click', event => {
  if (event.target.classList.contains('navTitle')) {
    refs.navLink[1].classList.add('current');
    refs.navLink[0].classList.remove('current');
    refs.inputSearch.classList.add('is-hidden', 'js-modal');
    refs.headerOverlay.classList.add('library');
    refs.btnLibrary.classList.remove('is-hidden', 'js-modal');
    clearfilms();
    pagination.reset(0)
    container.classList.add('is-hidden');
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
    refs.inputRef.value = ' ';
    container.classList.remove('is-hidden');
    onPag()
  }
});

refs.logotype.addEventListener('click', event => {
  if (event.target) {
    refs.navLink[0].classList.add('current');
    refs.navLink[1].classList.remove('current');
    refs.inputSearch.classList.remove('is-hidden', 'js-modal');
    refs.headerOverlay.classList.remove('library');
    refs.btnLibrary.classList.add('is-hidden', 'js-modal');
    refs.inputRef.value = ' ';
    container.classList.remove('is-hidden');
    onPag()
  }
});

function onPag() {
  renderStartFilms();
  pagination.on('afterMove', event => {
    let page = event.page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (refs.inputRef.value === ' ') {
      return filmsApiServise.getFilm(page).then(hits => {
        renderCardMain(hits.results);
      })
    } else {
      return filmsApiServise.fetchFilms(page).then(hits => {
        renderCardMain(hits.results);
      })
    }
  })
}

onPag()

function renderStartFilms(page) {
  refs.$loader.classList.add('show');
  refs.$loader.classList.remove('hide');
  filmsApiServise.getFilm(page).then(hits => {
    renderCardMain(hits.results);
    pagination.reset(hits.totalAmount);
    refs.$loader.classList.add('hide');
    refs.$loader.classList.remove('show');
  });
}

function createFilmsList(data) {
  refs.$loader.classList.add('show');
  refs.$loader.classList.remove('hide');
  filmsApiServise.fetchFilms(data).then(hits => {
    renderCardMain(hits.results);
    pagination.reset(hits.totalAmount);
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
    refs.inputRef.value = '';
  }
}

function renderCardMain(results) {
  refs.$render.innerHTML = cardMain(results);
}

function clearfilms() {
  refs.$render.innerHTML = '';
}

export { renderCardMain, clearfilms };