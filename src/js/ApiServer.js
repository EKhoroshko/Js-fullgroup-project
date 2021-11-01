import genreMovies from './genre';
import { error } from '@pnotify/core';

const KEY = '494b2b5ea2ae23dbb3e89fabdc88e3f6';
const BASE_URL = 'https://api.themoviedb.org/3/';

export default class FilmsApiServise {
  constructor() {
    this.searchQuery = '';
  }

  // объекты фильмов из "интересного",  в которые добавлены значения жанров и короткой даты
  getFilm(page = 1) {
    const url = `${BASE_URL}/trending/movie/week?api_key=${KEY}&page=${page}`;
    try {
      return fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(data => {
          if (data.results.length === 0) {
            return error({
              text: 'Something went wrong ...please try again',
              width: '400px',
              animateSpeed: 'fast',
              delay: 2000,
            });
          } else {
            return {
              results: this.addedNewKeytoArr(data),
              totalAmount: data.total_results,
            }
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  }

  goHome() {
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 1000)
  }

  // получаем по ключевому слову объекты фильмов, в которые добавлены значения жанров и короткой даты
  fetchFilms(pageNumber) {
    const url = `${BASE_URL}search/movie?api_key=${KEY}&language=en-US&page=${pageNumber}&include_adult=false&query=${this.searchQuery}`;
    try {
      return fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(data => {
          if (data.results.length === 0) {
            error({
              text: 'Something went wrong ...please try again',
              width: '450px',
              animateSpeed: 'fast',
              delay: 2000,
              icon: false,
            });
            this.goHome();
          } else {
            return {
              results: this.addedNewKeytoArr(data),
              totalAmount: data.total_results,
            }
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  }

  // трансформируем полученный массив обьектов фильмов добавляя новые ключи
  addedNewKeytoArr(data) {
    if(data!==NaN)
    {return data.results.map(result => {
      const genreName = this.giveGenres(result.genre_ids),
        oficialFilmsDate = result.release_date;
      let cutDate = '';
      if (oficialFilmsDate !== undefined) {
        cutDate = oficialFilmsDate.slice(0, 4);
      }
      result.poster_path === 'null' ? result.splice(indexOf(poster_path), 1) : result;
      return { ...result, genreName, cutDate };
    });
  }
  }

  // реализация получения жанров
  giveGenres(arrayGenre) {
    const findingGenres = [];
    for (let i = 0; i < arrayGenre.length; i++) {
      genreMovies.forEach(genre => {
        if (genre.id === arrayGenre[i]) {
          findingGenres.push(genre.name);
        }
      });
    }
    if (findingGenres.length > 2) {
      findingGenres.splice(2, findingGenres.length, '...other');
    } else if (findingGenres.length === 0) {
      findingGenres.push('Genre not defined');
    }
    return findingGenres;
  }
  }

  // получаем информацию о конкретном фильме
  fetchFilmsDescription(id) {
    const url = `${BASE_URL}movie/${id}?api_key=${KEY}&language=en-US`;
    return fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        let inModalGenreName = '';
        if (data.genres) {
          inModalGenreName = data.genres.map(genre => genre.name);
        }
        return { ...data, inModalGenreName };
      });
  }
}

