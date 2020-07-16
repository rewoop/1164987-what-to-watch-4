import {getGenresList} from "../../utils.js";
import NameSpace from "../name-space.js";

export const getGenres = (state) => {
  return getGenresList(state[NameSpace.DATA].films);
};

export const getPromoFilm = (state) => {
  return state[NameSpace.DATA].promoFilm;
};

export const getErrorDataStatus = (state) => {
  return state[NameSpace.DATA].isLoading;
};

export const getFilms = (state) => {
  return state[NameSpace.DATA].films;
};

export const getFilmComments = (state) => {
  return state[NameSpace.DATA].filmComments;
};
