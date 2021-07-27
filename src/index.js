import './sass/main.scss';
import { getFilm } from './js/ApiServer';
import { toggleModal } from './js/modal';
import { cardMain } from './templation/card.hbs';

const $render = document.querySelector('.gallery-list');

function renderCardMain() {
    $render.insertAdjacentHTML('beforeend', cardMain());
}