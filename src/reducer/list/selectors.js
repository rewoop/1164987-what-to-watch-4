import NameSpace from "../name-space.js";
import {ALL_GENRES} from "../../const.js";

export const getFilmsByGenre = (state) => {
  return state[NameSpace.LIST].genre === ALL_GENRES ? state[NameSpace.DATA].films : state[NameSpace.DATA].films.filter((currentFilm) => currentFilm.FILM_GENRE === state[NameSpace.LIST].genre);
};

export const isMoreFilm = (state) => {
  return (state[NameSpace.DATA].films.length - state[NameSpace.LIST].showedFilmsCount) > 0;
};
