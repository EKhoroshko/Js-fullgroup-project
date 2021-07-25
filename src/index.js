import './sass/main.scss';
import { getFilm } from './js/ApiServer';
import { cardMain } from './templation/card.hbs';

const $render = document.querySelector('.gallery-list');

function renderCardMain() {
    $render.insertAdjacentHTML('beforeend', cardMain());
}