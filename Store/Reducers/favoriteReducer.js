
const initialState = { favoritesFilm: [] };

export default function toggleFavorite(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
        const favFilmIndice = state.favoritesFilm.findIndex(item => item.id === action.value.id)
        if (favFilmIndice !== -1) {
          //suppression 
          nextState = {
            ...state,
            favoritesFilm: state.favoritesFilm.filter( (item, index) => index !== favFilmIndice)
          }
        }
        else {
          // ajout
          nextState = {
            ...state,
            favoritesFilm: [...state.favoritesFilm, action.value]
          }
        }
        return nextState || state
  default:
    return state;
  }
}