import getRefs from './get-refs';
const refs = getRefs();
import team from './team.json';
import cardTeamModal from '../templation/modal-team.hbs';
import { template } from 'lodash';

function onOpenTeamModal(e) {
  e.preventDefault();
  refs.modalTeam.classList.remove('is-hidden');
  //renderCardModal(e);
  //disableScroll();
  //}
}
function onCloseTeamModal() {
  refs.modalTeam.classList.add('is-hidden');
}
// function renderCardModal(result) {
//   const film = result.target.id;
//   filmsApiServise.fetchFilmsDescription(film).then(data => {
//     refs.modalForm.innerHTML = cardModal(data);
//   });
// }

refs.footerLink.addEventListener('click', onOpenTeamModal);
refs.closeTeamModalBtn.addEventListener('click', onCloseTeamModal);

const refTeamForm = document.querySelector('.team-modal-form');
console.log(refTeamForm);
refTeamForm.insertAdjacentHTML('beforeend', cardTeamModal(team));
console.log(cardTeamModal([]));
