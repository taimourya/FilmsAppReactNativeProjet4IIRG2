
const API_TOKEN = "23709588f70cb1124fa61ee62e8a597a";


export function getFilmsFromApiWithSearchedText (text, page = 1) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' 
                    + API_TOKEN + '&language=fr&query='
                     + text + "&page=" + page;
    return fetch(url)
            .then((response) => response.json())
            .catch((error) => console.error(error))
}

export function getImageFromApi (name) {
    return 'https://image.tmdb.org/t/p/w300' + name
}