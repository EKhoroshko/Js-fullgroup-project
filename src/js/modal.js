const modalScroll = require('./modal-scroll');
import getRefs from './get-refs';
const refs = getRefs();
import cardModal from '../templation/modal-main.hbs';
import FilmsApiServise from './ApiServer';
import { renderCardMain, clearfilms } from '../index';
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
    modalScroll.disableScroll();
  }
}

function renderCardModal(result) {
  const film = result.target.id;
  const switchData = data => data.id === Number(film);

  if (getLocalStorageWatched().some(switchData) || getLocalStorageQueue().some(switchData)) {
    let allFilms = {
      ...getLocalStorageQueue().find(switchData),
      ...getLocalStorageWatched().find(switchData),
    };
// console.log('allFilms',allFilms);
    refs.modalForm.innerHTML = cardModal(allFilms);
    return
  }

  filmsApiServise.fetchFilmsDescription(film).then(data => {
    refs.modalForm.innerHTML = cardModal(data);
  });
}
// CLOSE
function onCloseModal(e) {
  const target = e.target;
  if (
    target.matches('.about-close') ||
    target.matches('.close-icon') ||
    target.classList.contains('modal-backdrop')
  ) {
    refs.modal.classList.add('is-hidden');
    refs.modalForm.innerHTML = '';
    modalScroll.enableScroll();
  }
}

document.addEventListener('keydown', function (e) {
  const ESCAPE_CODE = 'Escape';
  if (e.key === ESCAPE_CODE) {
    refs.modal.classList.add('is-hidden');
    refs.modalForm.innerHTML = '';
    modalScroll.enableScroll();
  }
});

refs.$render.addEventListener('click', onOpenModal);
refs.modal.addEventListener('click', onCloseModal);
// END CLOSE

// library
// Watched
refs.btnWatchedInHeader.addEventListener('click', btnWatchedInHeader);

function btnWatchedInHeader(e) {
   refs.btnWatchedInHeader.classList.add('activeHeaderBtn');
  refs.btnQueueInHeader.classList.remove('activeHeaderBtn');
  renderCardMain(getLocalStorageWatched());
}
// Queue
refs.btnQueueInHeader.addEventListener('click', btnQueueInHeader);

function btnQueueInHeader (e) {
  refs.btnQueueInHeader.classList.add('activeHeaderBtn');
  refs.btnWatchedInHeader.classList.remove('activeHeaderBtn');
  renderCardMain(getLocalStorageQueue());
}

refs.modal.addEventListener('click', e => {
    //  filmsApiServise.resetPage()
  if (e.target.classList.contains('movie-add-queue')) {
   
    if (e.target.classList.contains('delete-queue') || e.target.textContent === 'remove from queue') {
      
      deleteFilm(e.target);
      e.target.classList.remove('delete-queue');
      e.target.textContent = 'add to queue';
      if (wherIAm() && refs.btnQueueInHeader.classList.contains('activeHeaderBtn')) {
        clearfilms();
        renderCardMain(getLocalStorageQueue());
      }
      return;
    }
    e.target.classList.add('delete-queue');
    e.target.textContent = 'remove from queue';
    filmsApiServise.fetchFilmsDescription(e.target.id).then(data => {
      const filmsData = getLocalStorageQueue(),
        queue = 'true',
        watched = 'true',
        inLibrary = 'true',
        genreName = data.inModalGenreName.slice();
      const oficialFilmsDate = data.release_date;
      let cutDate = '';
      if (oficialFilmsDate !== undefined) {
        cutDate = oficialFilmsDate.slice(0, 4);
      }
      data.poster_path === 'null' ? data.splice(indexOf(poster_path), 1) : data;
      if (genreName.length > 2) {
        genreName.splice(2, genreName.length, 'other');
      } else if (genreName.length === 0) {
        genreName.push('Genre not defined');
      }
      getLocalStorageWatched().includes(item => item.id == e.target.id)
        ? filmsData.push({ ...data, queue, cutDate, inLibrary, genreName, watched })
        : filmsData.push({ ...data, queue, cutDate, inLibrary, genreName });
      let newFilmsData = [];
      filmsData.filter(function (item) {
        let i = newFilmsData.findIndex(x => x.id == item.id);
        if (i <= -1) {
          newFilmsData.push(item);
        }
        return null;
      });
      setLocalStorageQueue(newFilmsData); 
// setLocalStorageQueue(filmsData);
      if (wherIAm() && refs.btnQueueInHeader.classList.contains('activeHeaderBtn')) {
        clearfilms();
        renderCardMain(getLocalStorageQueue());
      }
    });
  }
});

refs.modal.addEventListener('click', e => {
      // filmsApiServise.resetPage()
  if (e.target.classList.contains('movie-add-watched')) {
    
    if (e.target.classList.contains('delete-watched') || e.target.textContent === 'remove from watched') {
     
      deleteFilm(e.target);
      e.target.classList.remove('delete-watched');
      e.target.textContent = 'add to watched';
      if (wherIAm() && refs.btnWatchedInHeader.classList.contains('activeHeaderBtn')) {
        clearfilms();
        renderCardMain(getLocalStorageWatched());
      }
      return;
    }
    e.target.classList.add('delete-watched');
    e.target.textContent = 'remove from watched';
    filmsApiServise.fetchFilmsDescription(e.target.id).then(data => {
      let filmsData = getLocalStorageWatched();
      const watched = 'true';
      const queue = 'true';
      const inLibrary = 'true';
      const genreName = data.inModalGenreName.slice();
      const oficialFilmsDate = data.release_date;
      let cutDate = '';
      if (oficialFilmsDate !== undefined) {
        cutDate = oficialFilmsDate.slice(0, 4);
      }
      data.poster_path === 'null' ? data.splice(indexOf(poster_path), 1) : data;
      if (genreName.length > 2) {
        genreName.splice(2, genreName.length, 'other');
      } else if (genreName.length === 0) {
        genreName.push('Genre not defined');
      }

      getLocalStorageQueue().includes(item => item.id == e.target.id)
        ? filmsData.push({ ...data, queue, cutDate, inLibrary, genreName, watched })
        : filmsData.push({ ...data, watched, cutDate, inLibrary, genreName });
      let newFilmsData = [];
      filmsData.filter(function (item) {
        let i = newFilmsData.findIndex(x => x.id == item.id);
        if (i <= -1) {
          newFilmsData.push(item);
        }
        return null;
      });
      setLocalStorageWatched(newFilmsData);
      // setLocalStorageWatched(filmsData);
      if (wherIAm() && refs.btnWatchedInHeader.classList.contains('activeHeaderBtn')) {
        clearfilms();
        renderCardMain(getLocalStorageWatched());
      }
    });
  }
});

function wherIAm() {
  const currentSection = document.querySelector('.current');
  if (currentSection.textContent === 'MY LIBRARY') {
    return true;
  }
  return;
}

function deleteFilm(id) {
  if (id.classList.contains('movie-add-queue')) {
    const filmsItems = Array.from(getLocalStorageQueue());
    const arrayUpdateFilms = [];
    filmsItems.filter(item => {
      if (item.id !== Number(id.id)) {
        arrayUpdateFilms.push(item);
      }
    });
    setLocalStorageQueue(arrayUpdateFilms);
  } else {
    const filmsItems = Array.from(getLocalStorageWatched());
    const arrayWatchedFilms = [];
    filmsItems.filter(item => {
      if (item.id !== Number(id.id)) {
        arrayWatchedFilms.push(item);
      }
    });
    setLocalStorageWatched(arrayWatchedFilms);
  }
}
export {wherIAm};