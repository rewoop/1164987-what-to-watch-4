import {extend, getGenresList} from "./utils.js";
import film from "./mocks/film.js";
import films from "./mocks/films.js";
import {ALL_GENRES, MAX_FILMS_LENGTH} from "./const.js";

const initialState = {
  genre: ALL_GENRES,
  genresList: getGenresList(films),
  film,
  films: films.slice(0, MAX_FILMS_LENGTH),
  filmsByGenre: null,
  isMoreFilms: true,
  isGenreSort: false
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
  setFilms: () => {
    return {
      type: ActionType.SHOW_MORE_FILMS,
      films,
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_FILTER_BY_GENRE:
      return extend(state, {
        genre: action.genre,
        films: action.films.slice(0, MAX_FILMS_LENGTH),
        filmsByGenre: action.filmsByGenre,
        isMoreFilms: action.films.length > MAX_FILMS_LENGTH,
        isGenreSort: true,
      });
    case ActionType.SHOW_MORE_FILMS:
      return extend(state, {
        films: state.isGenreSort ?
          state.films
            .concat(state.filmsByGenre
              .slice(state.films.length, state.films.length + MAX_FILMS_LENGTH))
          :
          state.films
            .concat(action.films
              .slice(state.films.length, state.films.length + MAX_FILMS_LENGTH)),
        isMoreFilms: state.genre !== ALL_GENRES && state.isGenreSort ?
          (state.filmsByGenre - state.films.length) > MAX_FILMS_LENGTH
          :
          (action.films.length - state.films.length) > MAX_FILMS_LENGTH,
        isGenreSort: false,
      });
    default:
      return state;
  }
};


export {reducer, ActionType, ActionCreator};
