import getRefs from './get-refs';
const refs = getRefs();

function toggleModal() {
  refs.modal.classList.toggle('is-hidden');
}

refs.closeModalBtn.addEventListener('click', toggleModal);
refs.footerLink.addEventListener('click', toggleModal);
export    { toggleModal };