import * as React from "react";
import VideoPlayer from "../video-player/video-player";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";

interface Props {
  film: {
    id: number;
    filmTitle: string;
    filmImage: string;
    filmVideo: string;
  };
  isPlaying: boolean;
  setPlayingFilm: (b: boolean) => boolean;
}

const FilmCard: React.FunctionComponent<Props> = (props: Props) => {
  const {film, isPlaying, setPlayingFilm} = props;
  const {id, filmTitle, filmImage, filmVideo} = film;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => setPlayingFilm(true)}
      onMouseLeave={() => setPlayingFilm(false)}>
      <Link to={`${AppRoute.FILM_PAGE}/${id}`}>
        <div className="small-movie-card__image">
          <VideoPlayer
            isPlaying={isPlaying}
            src={filmVideo}
            poster={filmImage}
            muted
          />
          <img src={filmImage} alt={filmTitle} width="280" height="175"/>
        </div>
      </Link>
      <h3 className="small-movie-card__title">
        <Link to={`${AppRoute.FILM_PAGE}/${id}`}
          className="small-movie-card__link">{filmTitle}
        </Link>
      </h3>
    </article>
  );
};

export default FilmCard;
