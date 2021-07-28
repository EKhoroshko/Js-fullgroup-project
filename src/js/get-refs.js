export default function getRefs() {
  return {
    modal: document.querySelector('[about-modal]'),
    closeModalBtn: document.querySelector('[about-modal-close]'),
    footerLink: document.querySelector('[js-modal-open]'),
  };
}
