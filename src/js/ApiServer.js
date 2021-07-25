function getFilm() {
    const key = '494b2b5ea2ae23dbb3e89fabdc88e3f6';
    const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${key}`;
    return fetch(url).then(response => {
        return response.json();
    });
}

export { getFilm };