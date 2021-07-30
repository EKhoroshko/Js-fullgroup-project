/* import getRefs from './get-refs';
const refs = getRefs();

function toggleModal() {
  refs.modal.classList.toggle('is-hidden');
}

refs.closeModalBtn.addEventListener('click', toggleModal);
refs.footerLink.addEventListener('click', toggleModal);
export    { toggleModal }; */

import getRefs from './get-refs';
const refs = getRefs();
import cardModal from '../templation/modal-main.hbs';
import FilmsApiServise from './ApiServer';
const filmsApiServise = new FilmsApiServise();

function onOpenModal(result) {
  result.preventDefault();
  if (result.target.nodeName !== 'IMG') {
    return;
  }
  refs.modal.classList.remove('is-hidden');
  renderCardModal(result);
}

function onCloseModal(e) {
  const target = e.target;
  if (target.matches('.about-close') || target.matches('.modal-backdrop') ||
    target.matches('.close-icon')) {
      refs.modal.classList.add('is-hidden');
    } 
}

function renderCardModal(result) {
  const film = result.target.id; 
  filmsApiServise.fetchFilmsDescription(film).then(data =>
  {
    refs.modalForm.innerHTML = (cardModal(data));});
}

refs.$render.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);

// for library

/* const getLocalStorage = () => JSON?.parse(localStorage.getItem('gallery-list')) || [];
const setLocalStorage = (data) => localStorage.setItem('gallery-list', JSON.stringify(data));

function onQueueList (id) {
  const filmsQueue = getLocalStorage();
  const newQueueFilm = filmsQueue.filter(film => film.id != id);
  if (newQueueFilm) {
    setLocalStorage(newQueueFilm);
    // add to queue list insertAdjacentHTML('beforeend', newQueueFilm)
    refs.queueBtn.textContent = 'Remove from queue';
  } else {
    refs.queueBtn.textContent = 'Add to queue';
    // remove from queue list 
  }
}

function onWatchedList (id) {
  const watchedFilms = getLocalStorage();
  const newWatchedFilm = watchedFilms.filter(film => film.id != id);
  if (newWatchedFilm) {
    setLocalStorage(newWatchedFilm);
    // add to watched list insertAdjacentHTML('beforeend', newWatchedFilm)
    refs.watchedBtn.textContent = 'Remove from watched';
  } else {
    refs.watchedBtn.textContent = 'Add to watched';
    // remove from watched list 
  }
}

refs.watchedBtn.addEventListener('click', onWatchedList);
refs.queueBtn.addEventListener('click', onQueueList);

export { onOpenModal, onCloseModal, onQueueList, onWatchedList };

/* export { onOpenModal, onCloseModal }; */