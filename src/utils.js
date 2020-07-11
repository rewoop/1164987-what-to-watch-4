import {ALL_GENRES} from "./const.js";

export const formatReviewDate = (dateString) => {
  const date = new Date(dateString);
  const dateTimeFormat = new Intl.DateTimeFormat(`en`, {year: `numeric`, month: `2-digit`, day: `2-digit`});
  const [{value: month},, {value: day},, {value: year}] = dateTimeFormat.formatToParts(date);
  return `${year}-${month}-${day}`;
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getGenresList = (films) => {
  return [ALL_GENRES].concat(Array.from(new Set(films.map((film) => film.FILM_GENRE))));
};

export const formatRatingScoreToLevel = (score) => {
  if (score >= 0 && score <= 3) {
    return `Bad`;
  } else if (score > 3 && score <= 5) {
    return `Normal`;
  } else if (score > 5 && score <= 8) {
    return `Good`;
  } else if (score > 8 && score < 10) {
    return `Very good`;
  } else {
    return `Awesome`;
  }
};
