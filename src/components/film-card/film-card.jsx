import React from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";

const FilmCard = (props) => {
  const {film, onTitleClickHandler, onPosterClickHandler, isPlaying, setPlayingFilm} = props;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onClick={() => onPosterClickHandler(film)}
      onMouseEnter={() => setPlayingFilm(true)}
      onMouseLeave={() => setPlayingFilm(false)}>
      <div className="small-movie-card__image">
        <VideoPlayer
          isPlaying={isPlaying}
          src={film.FILM_VIDEO}
          poster={film.FILM_IMAGE}
          muted
        />
        <img src={film.FILM_IMAGE} alt={film.FILM_TITLE} width="280" height="175"/>
      </div>
      <h3 className="small-movie-card__title">
        <a onClick={(evt) => {
          evt.preventDefault();
          onTitleClickHandler(film);
        }} className="small-movie-card__link" href="movie-page.html">{film.FILM_TITLE}</a>
      </h3>
    </article>
  );
};

FilmCard.propTypes = {
  film: PropTypes.shape({
    FILM_TITLE: PropTypes.string.isRequired,
    FILM_IMAGE: PropTypes.string.isRequired,
    FILM_VIDEO: PropTypes.string.isRequired,
  }).isRequired,
  onTitleClickHandler: PropTypes.func.isRequired,
  onPosterClickHandler: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  setPlayingFilm: PropTypes.func.isRequired,
};

export default FilmCard;
