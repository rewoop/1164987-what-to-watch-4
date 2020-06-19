import React from "react";
import PropTypes from "prop-types";

const FilmCard = (props) => {
  const {film, onTitleClickHandler, onCardHover} = props;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => onCardHover(film)}
      onMouseLeave={() => onCardHover({})}>
      <div className="small-movie-card__image">
        <img src={film.image} alt={film.title} width="280" height="175"/>
      </div>
      <h3 className="small-movie-card__title">
        <a onClick={onTitleClickHandler} className="small-movie-card__link" href={film.link}>{film.title}</a>
      </h3>
    </article>
  );
};

FilmCard.propTypes = {
  film: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
  onTitleClickHandler: PropTypes.func.isRequired,
  onCardHover: PropTypes.func.isRequired,
};

export default FilmCard;
