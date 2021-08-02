export default function getRefs() {
  return {
    closeModalBtn: document.querySelector('[about-modal-close]'),
    $render: document.querySelector('.gallery-list'),
    inputRef: document.querySelector('.modal-form-input'),
    modalForm: document.querySelector('.about-form'),
    navLink: document.querySelectorAll('.navigationLink'),
    inputSearch: document.querySelector('.input-form'),
    headerOverlay: document.querySelector('.overlay'),
    btnLibrary: document.querySelector('.library_buttons'),
    addQueue: document.querySelector('[queue]'),
    modal: document.querySelector('#modal'),
    modalWindow: document.querySelector('.modal'),
    backdrop: document.querySelector('.modal-backdrop'),
    modalTeam: document.querySelector('[team-modal]'),
    footerLink: document.querySelector('[js-modal-open]'),
    closeTeamModalBtn: document.querySelector('[team-modal-close]'),
    teamModalBackdrop: document.querySelector('.team-modal-backdrop'),
    leaveBtn: document.querySelector('.team-modal-button'),
    $loader: document.querySelector('.loader'),
    leadList: document.querySelector('.lead'),
    membersList: document.querySelector('.team-student-info'),
  };
}
