import React from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";

const FilmCard = (props) => {
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

FilmCard.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
    filmTitle: PropTypes.string.isRequired,
    filmImage: PropTypes.string.isRequired,
    filmVideo: PropTypes.string.isRequired,
  }).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  setPlayingFilm: PropTypes.func.isRequired,
};

export default FilmCard;
