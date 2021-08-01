export default function getRefs() {
  return {
    closeModalBtn: document.querySelector('[about-modal-close]'),
    footerLink: document.querySelector('[js-modal-open]'),
    $render: document.querySelector('.gallery-list'),
    inputRef: document.querySelector('.modal-form-input'),
    modalForm: document.querySelector('.about-form'),
    watchedBtn: document.querySelector('.movie-add-watched'),
    queueBtn: document.querySelector('.movie-add-queue'),
    navLink: document.querySelectorAll('.navigationLink'),
    inputSearch: document.querySelector('.input-form'),
    headerOverlay: document.querySelector('.overlay'),
    btnLibrary: document.querySelector('.library_buttons'),
    addQueue: document.querySelector('[queue]'),
    modal: document.querySelector('#modal'),
    modalWindow: document.querySelector('.modal'),
    backdrop: document.querySelector('.modal-backdrop'),
    modalTeam: document.querySelector('[team-modal]'),
    closeTeamModalBtn: document.querySelector('[team-modal-close]'),
    teamModalBackdrop: document.querySelector('.team-modal-backdrop'),
    $loader: document.querySelector('.loader'),
  };
}