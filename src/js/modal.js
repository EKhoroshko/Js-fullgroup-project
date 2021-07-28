import getRefs from './get-refs';
const refs = getRefs();

function toggleModal() {
  refs.modal.classList.toggle('visually-hidden');
}

refs.closeModalBtn.addEventListener('click', toggleModal);
refs.footerLink.addEventListener('click', toggleModal);
export { toggleModal };
