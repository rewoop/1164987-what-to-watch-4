import {extend, getGenresList} from "./utils.js";
import film from "./mocks/film.js";
import films from "./mocks/films.js";
import {ALL_GENRES, MAX_FILMS_LENGTH} from "./const.js";

const initialState = {
  genre: ALL_GENRES,
  genresList: getGenresList(films),
  film,
  films,
  showedFilmsCount: MAX_FILMS_LENGTH,
  filmsByGenre: null,
  isMoreFilms: true
};

const ActionType = {
  SET_FILTER_BY_GENRE: `SET_FILTER_BY_GENRE`,
  SHOW_MORE_FILMS: `SHOW_MORE_FILMS`,
};

const ActionCreator = {
  setCurrentGenre: (genre) => {
    const sortedFilms = genre === ALL_GENRES ? films : films.filter((currentFilm) => currentFilm.genre === genre);
    return {
      type: ActionType.SET_FILTER_BY_GENRE,
      genre,
      films: sortedFilms,
      filmsByGenre: sortedFilms,
    };
  },
  setFilmsByShowMoreBtnClick: () => {
    return {
      type: ActionType.SHOW_MORE_FILMS,
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_FILTER_BY_GENRE:
      return extend(state, {
        genre: action.genre,
        films: action.films,
        filmsByGenre: action.filmsByGenre,
        isMoreFilms: action.films.length > MAX_FILMS_LENGTH,
        showedFilmsCount: MAX_FILMS_LENGTH,
      });
    case ActionType.SHOW_MORE_FILMS:
      return extend(state, {
        showedFilmsCount: state.showedFilmsCount + MAX_FILMS_LENGTH,
        isMoreFilms: (state.films.length - state.showedFilmsCount) > 0,
      });
    default:
      return state;
  }
};


export {reducer, ActionType, ActionCreator};
