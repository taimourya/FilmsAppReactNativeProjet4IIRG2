const API_TOKEN = "23709588f70cb1124fa61ee62e8a597a";
const API_URL = "https://api.themoviedb.org/3/movie/";


export function getFilmsFromApiWithSearchedText (text, page = 1) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' 
                    + API_TOKEN + '&language=fr&query='
                     + text + "&page=" + page;
    return fetch(url)
            .then((response) => response.json())
            .catch((error) => console.error(error))
}

export function getPopularFilmsFromApi() {
    const url = 'https://api.themoviedb.org/3/movie/popular?api_key=' + API_TOKEN + '&language=fr';
    return fetch(url)
            .then((response) => response.json())
            .catch((error) => console.error(error))
}

export function getImageFromApi (name) {
    return 'https://image.tmdb.org/t/p/w300' + name
}

export function getFilmDetailFromApi (id) {
    return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr')
        .then((response) => response.json())
        .catch((error) => console.error(error));
}

export function getFilmVideoFromApi(id) {
    const url = 'https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=' + API_TOKEN + '&language=fr';
    return fetch(url)
            .then((response) => response.json())
            .catch((error) => console.error(error))
}

export function getSimilarFilmFromApi(id) {
    const url = 'https://api.themoviedb.org/3/movie/' + id + '/similar?api_key=' + API_TOKEN +'&language=fr';
    return fetch(url)
            .then((response) => response.json())
            .catch((error) => console.error(error))
}