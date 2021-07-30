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

  // объекты фильмов из "интересного",  в которые добавлены значения жанров и короткой даты
  getFilm() {
    const url = `${BASE_URL}trending/all/day?api_key=${KEY}`;
    return fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const newRes = data.results.map(result => {
          const genreName = this.giveGenres(result.genre_ids);
          const oficialFilmsDate = result.release_date;
          const maybeFilmsDate = result.first_air_date;
          let cutDate = '';
          oficialFilmsDate !== undefined
            ? (cutDate = oficialFilmsDate.slice(0, 4))
            : (cutDate = maybeFilmsDate.slice(0, 4));
          result.poster_path === 'null' ? result.splice(indexOf(poster_path), 1) : result;

          return { ...result, genreName, cutDate };
        });
        console.log(newRes);
        return newRes;
      });
  }

  // получаем по ключевому слову объекты фильмов, в которые добавлены значения жанров и короткой даты
  fetchFilms() {
    const url = `${BASE_URL}search/movie?api_key=${KEY}&language=en-US&page=1&include_adult=false&query=${this.searchQuery}`;
    return fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const newRes = data.results.map(result => {
          const genreName = this.giveGenres(result.genre_ids);
          const oficialFilmsDate = result.release_date;
          const maybeFilmsDate = result.first_air_date;
          let cutDate = '';
          oficialFilmsDate !== undefined
            ? (cutDate = oficialFilmsDate.slice(0, 4))
            : (cutDate = maybeFilmsDate.slice(0, 4));
          result.poster_path === 'null' ? result.splice(indexOf(poster_path), 1) : result;
          return { ...result, genreName, cutDate };
        });
        console.log(newRes);
        return newRes;
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
    if (findingGenres.length > 2) {
      findingGenres.splice(2, findingGenres.length, 'Other');
    } else if (findingGenres.length === 0) {
      findingGenres.push('Other');
    }
    return findingGenres;
  }

  // получаем информацию о конкретном фильме


  fetchFilmsDescription(id) {
    const url = `${BASE_URL}movie/${id}?api_key=${KEY}&language=en-US`;
    return fetch(url).then(response => {
      return response.json();
    })
     .then(data => {
       const genreName = data.genres.map(genre => genre.name);
        return { ...data, genreName };
      });





    // .then(data => {
    //   const newRes = data.results.map(result => {
    //     const genreName = this.giveGenre(result.genre_ids);
    //     return { ...result, genreName };
    //   })

    //   console.log(newRes);
    //   // this.giveGenre(data.results[3].genre_ids) //[35, 18]
    // });
  }
}