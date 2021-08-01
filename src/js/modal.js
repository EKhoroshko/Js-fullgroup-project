import getRefs from './get-refs';
const refs = getRefs();
import cardModal from '../templation/modal-main.hbs';
import FilmsApiServise from './ApiServer';
const filmsApiServise = new FilmsApiServise();

//==============
const getLocalStorageQueue = () => JSON?.parse(localStorage.getItem('queue')) || [];
const setLocalStorageQueue = data => localStorage.setItem('queue', JSON.stringify(data));
//==================

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
  if (target.matches('.about-close') || target.matches('.close-icon')) {
    refs.modal.classList.add('is-hidden');
    enableScroll();
  }
}

refs.backdrop.addEventListener('click', function (e) {
  if (e.target === e.currentTarget) {
    this.classList.add('is-hidden');
    enableScroll();
  }
});

document.addEventListener('keydown', function (e) {
  const ESCAPE_CODE = "Escape";
  if (e.key === ESCAPE_CODE) {
    refs.modal.classList.add('is-hidden');
    enableScroll();
  }
});

refs.$render.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);

// library
refs.modal.addEventListener('click', e => {
  if (e.target.classList.contains('movie-add-queue')) {
    if (e.target.classList.contains('delete')) {
      deleteFilm(e.target.id);
      e.target.classList.remove('delete');
      e.target.textContent = 'add to queue';
      return;
    }
    e.target.classList.add('delete');
    e.target.textContent = 'remove to queue';

    filmsApiServise.fetchFilmsDescription(e.target.id).then(data => {
      let filmsData = getLocalStorageQueue();
      let queue = 'true';
      filmsData.sort().push({ ...data, queue });
      setLocalStorageQueue(filmsData);
    });
  }
});

const deleteFilm = id => {
  const filmsItems = getLocalStorageQueue();
  const newFilmsItems = filmsItems.sort().filter(item => {
    item.id !== id;
  });
  setLocalStorageQueue(newFilmsItems);
};

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