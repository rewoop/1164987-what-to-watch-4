import React from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";

const FilmCard = (props) => {
  const {film, onTitleClickHandler, onPosterClickHandler, isPlaying, setPlayingFilm} = props;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onClick={() => onPosterClickHandler(Object.assign({id: 1}, film))}
      onMouseEnter={() => setPlayingFilm(true)}
      onMouseLeave={() => setPlayingFilm(false)}>
      <div className="small-movie-card__image">
        <VideoPlayer
          isPlaying={isPlaying}
          src={film.src}
          poster={film.image}
          muted
        />
        <img src={film.image} alt={film.title} width="280" height="175"/>
      </div>
      <h3 className="small-movie-card__title">
        <a onClick={(evt) => {
          evt.preventDefault();
          onTitleClickHandler(Object.assign({id: 1}, film));
        }} className="small-movie-card__link" href={film.link}>{film.title}</a>
      </h3>
    </article>
  );
};

FilmCard.propTypes = {
  film: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
  onTitleClickHandler: PropTypes.func.isRequired,
  onPosterClickHandler: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  setPlayingFilm: PropTypes.func.isRequired,
};

export default FilmCard;
