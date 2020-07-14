import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {getFilms} from "../data/selectors";
import {ALL_GENRES} from "../../const.js";

const getCurrentGenre = (state) => {
  return state[NameSpace.LIST].genre;
};

const getShowedFilmsCount = (state) => {
  return state[NameSpace.LIST].showedFilmsCount;
};

export const getFilmsByGenre = createSelector(
    getFilms,
    getCurrentGenre,
    (films, currentGenre) => {
      if (currentGenre === ALL_GENRES) {
        return films;
      }
      return films.filter((currentFilm) => currentFilm.filmGenre === currentGenre);
    }
);

export const isMoreFilm = createSelector(
    getFilms,
    getShowedFilmsCount,
    (films, showedFilmsCount) => {
      return (films.length - showedFilmsCount) > 0;
    }
);
