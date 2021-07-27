//экспорт массива с объектами жанров и их ID
import genreMovies from './genre';

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

  // получаем промис фильмов
  fetchFilms() {
    const url = `${BASE_URL}search/movie?api_key=${KEY}&language=en-US&page=1&include_adult=false&query=${this.searchQuery}`;
    return fetch(url).then(response => {
      return response.json();
    });
  }

  // получаем объекты с фильмами по ключевому слову
  fetchFilmsByKeyWord() {
    this.fetchFilms().then(data => {
      const films = data.results;
      films.map(film => {
        console.log(film);
        return film;
      });
    });
  }

  // получаем массивы жанров фильмов, найденных по ключевому слову
  fetchFilmsGenres() {
    this.fetchFilms().then(data => {
      const films = data.results;
      films.map(film => {
        console.log(this.giveGenres(film.genre_ids));
        return this.giveGenres(film.genre_ids);
      });
    });
  }
  // реализация получения жанров (кто знает как сделать красивее - милости прошу)))))
  giveGenres(arrayGenre) {
    const findingGenres = [];
    for (const arr of arrayGenre) {
      for (const genre of genreMovies) {
        if (arr === genre.id) {
          findingGenres.push(genre.name);
        }
      }
    }
    return findingGenres;
  }

  // получаем информацию о конкретном фильме
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
