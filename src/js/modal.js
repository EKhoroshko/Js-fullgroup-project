import getRefs from './get-refs';
const refs = getRefs();
import cardModal from '../templation/modal-main.hbs';
import FilmsApiServise from './ApiServer';
import { renderCardMain } from '../index';
const filmsApiServise = new FilmsApiServise();

//==============
const getLocalStorageQueue = () => JSON?.parse(localStorage.getItem('queue')) || [];
const setLocalStorageQueue = data => localStorage.setItem('queue', JSON.stringify(data));
const getLocalStorageWatched = () => JSON?.parse(localStorage.getItem('watched')) || [];
const setLocalStorageWatched = data => localStorage.setItem('watched', JSON.stringify(data));

//==================

function onOpenModal(result) {
  result.preventDefault();
  if (
    result.target.nodeName === 'IMG' ||
    result.target.nodeName === 'H2' ||
    result.target.nodeName === 'DIV'
  ) {
    refs.modal.classList.remove('is-hidden');
    renderCardModal(result);
    disableScroll();
  }
}

function renderCardModal(result) {
  const film = result.target.id;
  const switchData = data => data.id === Number(film);
  if (getLocalStorageQueue().some(switchData)) {
    refs.modalForm.innerHTML = cardModal(getLocalStorageQueue().find(switchData));
    return;
  }
  filmsApiServise.fetchFilmsDescription(film).then(data => {
    refs.modalForm.innerHTML = cardModal(data);
  });
}

function onCloseModal(e) {
  const target = e.target;
  if (
    target.matches('.about-close') ||
    target.matches('.close-icon') ||
    target.classList.contains('modal-backdrop')
  ) {
    refs.modal.classList.add('is-hidden');
    refs.modalForm.innerHTML = '';
    enableScroll();
  }
}

// refs.backdrop.addEventListener('click', function (e) {
//   if (e.target === e.currentTarget) {
//     this.classList.add('is-hidden');
//     refs.modalForm.innerHTML = '';
//     enableScroll();
//   }
// });

document.addEventListener('keydown', function (e) {
  const ESCAPE_CODE = 'Escape';
  if (e.key === ESCAPE_CODE) {
    refs.modal.classList.add('is-hidden');
    refs.modalForm.innerHTML = '';
    enableScroll();
  }
});

refs.$render.addEventListener('click', onOpenModal);
refs.modal.addEventListener('click', onCloseModal);

// library
refs.modal.addEventListener('click', e => {
  if (e.target.classList.contains('movie-add-queue')) {
    if (e.target.classList.contains('delete')) {
      deleteFilm(e.target);
      e.target.classList.remove('delete');
      e.target.textContent = 'add to queue';
      return;
    }
    e.target.classList.add('delete');
    e.target.textContent = 'remove from queue';
    filmsApiServise.fetchFilmsDescription(e.target.id).then(data => {
      const filmsData = getLocalStorageQueue(),
        queue = 'true',
        inLibrary = 'true',
        genreName = data.inModalGenreName.slice();
      const oficialFilmsDate = data.release_date,
        maybeFilmsDate = data.first_air_date;
      let cutDate = '';
      oficialFilmsDate !== undefined
        ? (cutDate = oficialFilmsDate.slice(0, 4))
        : (cutDate = maybeFilmsDate.slice(0, 4));
      data.poster_path === 'null' ? data.splice(indexOf(poster_path), 1) : data;

      if (genreName.length > 2) {
        genreName.splice(2, genreName.length, '...other');
      } else if (genreName.length === 0) {
        genreName.push('Genre not defined');
      }
      filmsData.push({ ...data, queue, cutDate, inLibrary, genreName });
      setLocalStorageQueue(filmsData);
      if (wherIAm()) {
        renderCardMain(filmsData);
      }
    });
  }
});

refs.modal.addEventListener('click', e => {
  if (e.target.classList.contains('movie-add-watched')) {
    filmsApiServise.fetchFilmsDescription(e.target.id).then(data => {
      let filmData = getLocalStorageWatched();
      filmData.push(data);
      //  filmData.filter((item, index) => {filmData.indexOf(item) === index});

      setLocalStorageWatched(filmData);
    });
  }
});

// START NEW
//  const currentSection = document.querySelector('.current')
// console.dir(currentSection);

function wherIAm() {
  const currentSection = document.querySelector('.current');
  if (currentSection.textContent === 'MY LIBRARY') {
    return true;
  }
  return;
}

const deleteFilm = id => {
  const filmsItems = Array.from(getLocalStorageQueue());
  const arrayUpdateFilms = [];
  const bufer = {};
  const newFilmsItems = filmsItems.filter(item => {
    if (item.id !== Number(id.id)) {
      arrayUpdateFilms.push(item);
    }
  });
  //   if (e.target.textContent = 'add to queue') {
  //   arrayUpdateFilms.push(item)
  // }
  setLocalStorageQueue(arrayUpdateFilms);

  if (wherIAm()) {
    renderCardMain(arrayUpdateFilms);
  }
};

// END NEW
// scroll
const disableScroll = () => {
  const widthScroll = window.innerWidth - document.body.offsetWidth;
  document.body.dbScrollY = window.scrollY;
  document.body.style.cssText = `
        position: fixed;
        top: ${-window.scrollY}px;
        left: 0;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        padding-right: ${widthScroll}px;
    `;
};

const enableScroll = () => {
  document.body.style.cssText = '';
  window.scroll({
    top: document.body.dbScrollY,
  });
};

export { disableScroll, enableScroll };
