//экспорт массива с объектами жанров и их ID
import genreMovis from './genre';
console.log(genreMovis);

const KEY = '494b2b5ea2ae23dbb3e89fabdc88e3f6';
const BASE_URL = 'https://api.themoviedb.org/3/';

export default class FilmsApiServise {
  constructor() {
    this.searchQuery = '';
    this.filmID = '';
    this.page = 1;
  }

  getFilm() {
    const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${KEY}`;
    return fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data.results);
      });
  }

  fetchFilmsByKeyWord() {
    const url = `${BASE_URL}search/movie?api_key=${KEY}&language=en-US&page=1&include_adult=false&query=${this.searchQuery}`;
    return fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data.results);
        this.giveGenre(data.results[3].genre_ids) //[35, 18]
        
      });
  }
// //console.log(data.results[0].genre_ids); получили массив ID жанров
  
  giveGenre(arrayGenre) {
    console.log(arrayGenre);
    const commonElements = [];
    for (let i = 0; i < arrayGenre.length; i++) {
      genreMovis.forEach((genreMov) => {
        if (genreMov.id === arrayGenre[i]) {
        commonElements.push(genreMov.name)
        }
      })
    }

    // const genre = genreMovis.reduce((acc, genreMov) => { acc.push(genreMov.name); return acc }, []);
    console.log(commonElements);
  }
  
  fetchFilmsDescription() {
    const url = `${BASE_URL}movie/${this.filmID}?api_key=${KEY}&language=en-US`;
    return fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
      });
  }
}


