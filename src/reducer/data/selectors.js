import {getGenresList} from "../../utils.js";
import NameSpace from "../name-space.js";

export const getGenres = (state) => {
  return getGenresList(state[NameSpace.DATA].films);
};

export const getPromoFilm = (state) => {
  return state[NameSpace.DATA].promoFilm;
};

export const getFavoriteFilms = (state) => {
  return state[NameSpace.DATA].favoriteFilms;
};

export const getLoadingFilmsStatus = (state) => {
  return state[NameSpace.DATA].isLoadingFilms;
};

export const getLoadingPromoFilmStatus = (state) => {
  return state[NameSpace.DATA].isLoadingPromoFilm;
};

export const getErrorLoadingDataStatus = (state) => {
  return state[NameSpace.DATA].isError;
};

export const getDisableFormStatus = (state) => {
  return state[NameSpace.DATA].isDisableForm;
};

export const getFilms = (state) => {
  return state[NameSpace.DATA].films;
};

export const getFilmComments = (state) => {
  return state[NameSpace.DATA].filmComments;
};
