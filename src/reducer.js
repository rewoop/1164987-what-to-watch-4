import {extend, getGenresList} from "./utils.js";
import film from "./mocks/film.js";
import films from "./mocks/films.js";
import {ALL_GENRES} from "./const.js";

const initialState = {
  genre: ALL_GENRES,
  genresList: getGenresList(films),
  film,
  films,
};

const ActionType = {
  SET_FILTER_BY_GENRE: `SET_FILTER_BY_GENRE`
};

const ActionCreator = {
  setCurrentGenre: (genre) => {
    const sortedFilms = genre === ALL_GENRES ? films : films.filter((currentFilm) => currentFilm.genre === genre);
    return {
      type: ActionType.SET_FILTER_BY_GENRE,
      genre,
      films: sortedFilms
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_FILTER_BY_GENRE:
      return extend(state, {
        genre: action.genre,
        films: action.films
      });
    default:
      return state;
  }
};


export {reducer, ActionType, ActionCreator};
