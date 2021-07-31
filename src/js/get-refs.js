export default function getRefs() {
  return {
    modal: document.querySelector('[about-modal]'),
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
    backdrop: document.querySelector('.modal-backdrop'),
  };
}
