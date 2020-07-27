import * as React from "react";

interface Props {
  genre: string,
  releaseDate: number,
  filmDirector: string,
  filmStarring: string[],
  runTime: string,
}

const FilmPageDetails: React.FunctionComponent<Props> = (props: Props) => {
  const {genre, releaseDate, filmDirector, filmStarring, runTime} = props;

  return (
    <React.Fragment>
      <div className="movie-card__text movie-card__row">
        <div className="movie-card__text-col">
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Director</strong>
            <span className="movie-card__details-value">{filmDirector}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Starring</strong>
            <span className="movie-card__details-value">{filmStarring.join(`, `)}</span>
          </p>
        </div>

        <div className="movie-card__text-col">
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Run Time</strong>
            <span className="movie-card__details-value">{runTime}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Genre</strong>
            <span className="movie-card__details-value">{genre}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Released</strong>
            <span className="movie-card__details-value">{releaseDate}</span>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FilmPageDetails;
