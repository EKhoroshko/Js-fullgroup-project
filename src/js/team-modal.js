import getRefs from './get-refs';
const refs = getRefs();
import team from './team.json';
import cardTeamModal from '../templation/modal-team.hbs';
import { template } from 'lodash';
/* import { disableScroll, enableScroll } from './modal'; */

function onOpenTeamModal(e) {
  e.preventDefault();
  refs.modalTeam.classList.remove('is-hidden');
  renderTeamModal(team);
  /* disableScroll(); */
}

function onCloseTeamModal() {
  refs.modalTeam.classList.add('is-hidden');
  refs.membersList.innerHTML = '';
  /* enableScroll(); */
}

function renderTeamModal(data) {
  refs.membersList.insertAdjacentHTML('beforeend', cardTeamModal(team));
}

refs.footerLink.addEventListener('click', onOpenTeamModal);
refs.closeTeamModalBtn.addEventListener('click', onCloseTeamModal);
refs.leaveBtn.addEventListener('click', onCloseTeamModal);