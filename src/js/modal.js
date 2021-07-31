import getRefs from './get-refs';
const refs = getRefs();
import cardModal from '../templation/modal-main.hbs';
import FilmsApiServise from './ApiServer';
const filmsApiServise = new FilmsApiServise();

function onOpenModal(result) {
  result.preventDefault();
  if (result.target.nodeName === 'IMG' || result.target.nodeName === 'H2') {
    refs.modal.classList.remove('is-hidden');
    renderCardModal(result);
    disableScroll();
  }
}

function renderCardModal(result) {
  const film = result.target.id; 
  filmsApiServise.fetchFilmsDescription(film).then(data =>
  {
    refs.modalForm.innerHTML = (cardModal(data));});
}

function onCloseModal(e) {
  const target = e.target;
  if (target.matches('.about-close') || target.matches('.close-icon')) { 
    refs.modal.classList.add('is-hidden');
    enableScroll();
  }
    refs.closeModalBtn.removeEventListener('click', onCloseModal);
}

refs.backdrop.addEventListener('click', function() {
  refs.modal.classList.add('is-hidden');
  this.classList.add('is-hidden');
  enableScroll();
});

document.addEventListener('keydown', function(e) {
  const ESCAPE_CODE = "Escape";
  if (e.key === ESCAPE_CODE) {
    refs.modal.classList.add('is-hidden');
    enableScroll();
  }  
});

refs.$render.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);

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
    })
}

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