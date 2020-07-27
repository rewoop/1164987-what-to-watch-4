import * as React from "react";
import {formatRatingScoreToLevel} from "../../utils";

interface Props {
  ratingScore: number,
  ratingLevel: number,
  ratingCount: string,
  filmDescription: string,
  filmDirector: string,
  filmStarring: string[],
}

const MAX_FILM_STARRING = 4;

const checkFilmStarrings = (starrings) => {
  return starrings.length > MAX_FILM_STARRING ? `${starrings.slice(0, 4).join(`, `)} and other` : starrings.join(`, `);
};

const FilmPageOverview: React.FunctionComponent<Props> = (props: Props) => {
  const {ratingScore, ratingLevel, ratingCount, filmDescription, filmDirector, filmStarring} = props;

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default FilmPageOverview;
