import './sass/main.scss';

// в консоли были ошибки я закомментировал
// import { toggleModal } from './js/modal';


import cardMain from './templation/card.hbs';
import FilmsApiServise from './js/ApiServer';

const $render = document.querySelector('.gallery-list');
const inputRef = document.querySelector('.modal-form-input');
const filmsApiServise = new FilmsApiServise();

inputRef.addEventListener('input', onInputSearch);

function renderCardMain(results) {
  $render.insertAdjacentHTML('beforeend', cardMain(results));
}

function onInputSearch(e) {
  e.preventDefault();
  filmsApiServise.searchQuery = e.target.value;
  filmsApiServise.fetchFilmsByKeyWord()
    
  //   .then(data => renderCardMain(data));
  
  // console.log(filmsApiServise.fetchFilmsByKeyWord())

}
