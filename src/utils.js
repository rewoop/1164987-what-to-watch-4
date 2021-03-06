import {ALL_GENRES, RatingLevel} from "./const.js";

export const formatReviewDate = (dateString, isForUser) => {
  const date = new Date(dateString);
  const dateTimeFormat = new Intl.DateTimeFormat(`en`, {year: `numeric`, month: `${isForUser ? `long` : `2-digit`}`, day: `2-digit`});
  const [{value: month},, {value: day},, {value: year}] = dateTimeFormat.formatToParts(date);
  return isForUser ? `${month} ${day}, ${year}` : `${year}-${month}-${day}`;
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getGenresList = (films) => {
  return [ALL_GENRES].concat(Array.from(new Set(films.map((film) => film.filmGenre))));
};

export const formatRatingScoreToLevel = (score) => {
  if (score >= RatingLevel.MIN_BAD && score <= RatingLevel.MAX_BAD) {
    return `Bad`;
  } else if (score > RatingLevel.MAX_BAD && score <= RatingLevel.MAX_NORMAL) {
    return `Normal`;
  } else if (score > RatingLevel.MAX_NORMAL && score <= RatingLevel.MAX_GOOD) {
    return `Good`;
  } else if (score > RatingLevel.MAX_GOOD && score < RatingLevel.MAX_VERY_GOOD) {
    return `Very good`;
  } else {
    return `Awesome`;
  }
};

export const formatRunTimeDate = (runtime) => {
  let hours = Math.floor(runtime / 60);
  let minutes = Math.floor(((runtime / 60) - hours) * 100);

  if (minutes >= 60) {
    minutes = minutes - 60;
    hours += 1;
  }

  return `${hours}h ${minutes}m`;
};

export const noop = () => {
  // do nothing
};
