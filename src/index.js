import './sass/main.scss';
import getRefs from './js/get-refs.js';
// import Pagination from 'tui-pagination';
const refs = getRefs();

import { onOpenModal, onCloseModal, wherIAm } from './js/modal.js';
import cardMain from './templation/card.hbs';
import FilmsApiServise from './js/ApiServer';
import darkTheme from './js/darkTheme';

import { onOpenTeamModal, onCloseTeamModal } from './js/team-modal.js';
import { Toast } from './js/toast';

var debounce = require('debounce');

const filmsApiServise = new FilmsApiServise();
// const container = document.getElementById('pagination');

// const options = {
//   totalItems: 20,
//   itemsPerPage: 20,
//   visiblePages: 5,
//   page: 1,
//   centerAlign: true,
//   firstItemClassName: 'tui-first-child',
//   lastItemClassName: 'tui-last-child',
//   template: {
//     page: '<a href="#" class="tui-page-btn">{{page}}</a>',
//     currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
//     moveButton:
//       '<a href="#" class="tui-page-btn tui-{{type}}">' +
//       '<span class="tui-ico-{{type}}">{{type}}</span>' +
//       '</a>',
//     disabledMoveButton:
//       '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
//       '<span class="tui-ico-{{type}}">{{type}}</span>' +
//       '</span>',
//     moreButton:
//       '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
//       '<span class="tui-ico-ellip">...</span>' +
//       '</a>',
//   },
// };

// const pagination = new Pagination(container, options);

refs.inputRef.addEventListener('input', debounce(onInputSearch, 3000));


refs.navLink[1].addEventListener('click', event => {
  filmsApiServise.resetPage()
  refs.$render.classList.remove('start');
    refs.$render.classList.remove('search');
  if (event.target.classList.contains('navTitle')) {
    refs.navLink[1].classList.add('current');
    refs.navLink[0].classList.remove('current');
    refs.inputSearch.classList.add('is-hidden', 'js-modal');
    refs.headerOverlay.classList.add('library');
    refs.btnLibrary.classList.remove('is-hidden', 'js-modal');
    clearfilms();
    renderCardMain(JSON.parse(localStorage.getItem('queue')));
    // pagination.reset(0);
  }
});

refs.navLink[0].addEventListener('click', event => {
  filmsApiServise.resetPage()
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
  filmsApiServise.resetPage()
  if (event.target) {
    refs.navLink[0].classList.add('current');
    refs.navLink[1].classList.remove('current');
    refs.inputSearch.classList.remove('is-hidden', 'js-modal');
    refs.headerOverlay.classList.remove('library');
    refs.btnLibrary.classList.add('is-hidden', 'js-modal');
    renderStartFilms();
  }
});

// pagination.on('afterMove', event => {
//   let currentPage;

//   if (wherIAm()) {
//     currentPage = false
//   } else {
//     if(filmsApiServise.query === '')
//    { currentPage = event.page
// renderStartFilms(event.page)}
// if (filmsApiServise.query !== '')
// {    console.log('seach', event.page)
// currentPage = event.page
// createFilmsList(event.page)}
//     // filmsApiServise.currentPage = event.page;
//     // filmsApiServise.fetchFilms().then(hits => {
//     //   return renderCardMain(hits.results);
//     // });

//   }
// });

function renderStartFilms() {
  refs.$loader.classList.add('show');
  refs.$loader.classList.remove('hide');

  refs.$render.classList.add('start');
  refs.$render.classList.remove('search');
  filmsApiServise.getFilm().then(hits => {

    // pagination.reset(hits.totalAmount);

    renderCardMain(hits.results);
// filmsApiServise.resetPage()
    // filmsApiServise.incrementPage();
    refs.$loader.classList.add('hide');
    refs.$loader.classList.remove('show');
  });
}
renderStartFilms();

function createFilmsList() {
  refs.$loader.classList.add('show');
  refs.$loader.classList.remove('hide');
  refs.$render.classList.remove('start');
  refs.$render.classList.add('search');

  filmsApiServise.fetchFilms().then(hits => {

    // pagination.reset(hits.totalAmount);

    renderCardMain(hits.results);
// filmsApiServise.resetPage()
    // filmsApiServise.incrementPage();
    // console.log(hits.results.length === 0);
    // if (hits.results.length === 0) {
    //   return Toast.add({
    //   text: 'Всем привет',
    //   color: '#dc3545 !important',
    //   autohide: false
    //   });
    //   console.log(Toast);}


    refs.$loader.classList.add('hide');
    refs.$loader.classList.remove('show');
  });
}

function onInputSearch(e) {
  e.preventDefault();
  filmsApiServise.resetPage()
  if (refs.inputRef.value !== '' || refs.inputRef.value !== ' ') {
    filmsApiServise.searchQuery = e.target.value;
    clearfilms();
    createFilmsList();
    refs.inputRef.value = '';
  } else {
    clearfilms();
    renderStartFilms();
    
    
  }
  // refs.inputRef.reset()
}

function renderCardMain(results) {
  refs.$render.innerHTML = cardMain(results);
}

function clearfilms() {
  refs.$render.innerHTML = '';
}

const onEntry = entries => {
  entries.forEach(entry => {
    // console.log('entry.isIntersecting', refs.inputRef.hasFocus)
    if (entry.isIntersecting&& filmsApiServise.query !== '' && refs.$render.classList.contains('start')) {
      renderStartFilms();
      filmsApiServise.incrementPage();
    }

    if (entry.isIntersecting && filmsApiServise.query !== '' && refs.$render.classList.contains('search')) {
      // console.log('entry.isIntersecting && filmsApiServise.query ', entry.isIntersecting && filmsApiServise.query === '')
      createFilmsList();
      filmsApiServise.incrementPage();

    }
  });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '300px',
});

observer.observe(refs.scroll);

export { renderCardMain, clearfilms };
