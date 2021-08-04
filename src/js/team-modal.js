const modalScroll = require('./modal-scroll');
import getRefs from './get-refs';
const refs = getRefs();
import team from './team.json';
import cardTeamModal from '../templation/modal-team.hbs';
import { template } from 'lodash';

function onOpenTeamModal(e) {
  e.preventDefault();
  refs.modalTeam.classList.remove('is-hidden');
  renderTeamModal(team);
  modalScroll.disableScroll();
}

function renderTeamModal(team) {
  refs.membersList.insertAdjacentHTML('beforeend', cardTeamModal(team));
}

function onCloseTeamModal() {
  refs.modalTeam.classList.add('is-hidden');
  refs.membersList.innerHTML = '';
  modalScroll.enableScroll();
}

document.addEventListener('keydown', function (e) {
  const ESCAPE_CODE = 'Escape';
  if (e.key === ESCAPE_CODE) {
    refs.modalTeam.classList.add('is-hidden');
    refs.membersList.innerHTML = '';
    modalScroll.enableScroll();
  }
});

refs.footerLink.addEventListener('click', onOpenTeamModal);

refs.closeTeamModalBtn.addEventListener('click', onCloseTeamModal);
refs.leaveBtn.addEventListener('click', onCloseTeamModal);
refs.teamModalBackdrop.addEventListener('click', onCloseTeamModal);
