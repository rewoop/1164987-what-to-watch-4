import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {formatRatingScoreToLevel} from "../../utils.js";

const MAX_FILM_STARRING = 4;

const checkFilmStarrings = (starrings) => {
  return starrings.length > MAX_FILM_STARRING ? `${starrings.slice(0, 4).join(`, `)} and other` : starrings.join(`, `);
};

const FilmPageOverview = (props) => {
  const {ratingScore, ratingLevel, ratingCount, filmDescription, filmDirector, filmStarring} = props;

  return (
    <Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{ratingScore}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{formatRatingScoreToLevel(ratingLevel)}</span>
          <span className="movie-rating__count">{ratingCount}</span>
        </p>
      </div>

      <div className="movie-card__text">
        <p>{filmDescription}</p>
        <p className="movie-card__director"><strong>Director: {filmDirector}</strong></p>
        <p className="movie-card__starring"><strong>Starring: {checkFilmStarrings(filmStarring)}</strong></p>
      </div>
    </Fragment>
  );
};

FilmPageOverview.propTypes = {
  ratingScore: PropTypes.number.isRequired,
  ratingLevel: PropTypes.number.isRequired,
  ratingCount: PropTypes.string.isRequired,
  filmDescription: PropTypes.string.isRequired,
  filmDirector: PropTypes.string.isRequired,
  filmStarring: PropTypes.arrayOf(
      PropTypes.string.isRequired
  ).isRequired,
};

export default FilmPageOverview;
