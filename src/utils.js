import {ALL_GENRES} from "./const.js";

export const formatReviewDate = (dateString) => {
  const date = new Date(dateString);
  date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 10);
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getGenresList = (films) => {
  return [ALL_GENRES].concat(Array.from(new Set(films.map((film) => film.genre))));
};
