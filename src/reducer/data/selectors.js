import {getGenresList} from "../../utils.js";
import NameSpace from "../name-space.js";

export const getGenres = (state) => {
  return getGenresList(state[NameSpace.DATA].films);
};
