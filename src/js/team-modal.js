import getRefs from './get-refs';
const refs = getRefs();
import team from './team.json';
import cardTeamModal from '../templation/modal-team.hbs';
import { template } from 'lodash';

function onOpenTeamModal(e) {
  e.preventDefault();
  refs.modalTeam.classList.remove('is-hidden');
  renderTeamModal(team);
  //renderCardModal(e);
  //disableScroll();
  //}
}
function onCloseTeamModal() {
  refs.modalTeam.classList.add('is-hidden');
}

function renderTeamModal(data) {
  // console.log(data.length);
  // if ((data.length = 2)) {
  //   console.log(data.length);
  refs.leadList.insertAdjacentHTML('beforeend', cardTeamModal(team));
  //   console.log(team[0]);
  //   console.log(cardTeamModal([]));
  // } else if (data) {
  refs.membersList.insertAdjacentHTML('beforeend', cardTeamModal(team));
  // }
}

refs.footerLink.addEventListener('click', onOpenTeamModal);
refs.closeTeamModalBtn.addEventListener('click', onCloseTeamModal);

// const refTeamForm = document.querySelector('.team-modal-form');
// console.log(refTeamForm);
// refs.leadList.insertAdjacentHTML('beforeend', cardTeamModal(team));
// console.log(cardTeamModal([]));
