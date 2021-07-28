export default function getRefs() {
  return {
    modal: document.querySelector('[about-modal]'),
    closeModalBtn: document.querySelector('[about-modal-close]'),
    footerLink: document.querySelector('[js-modal-open]'),
    $render: document.querySelector('.gallery-list'),
    inputRef: document.querySelector('.modal-form-input'),
    
  };
}
