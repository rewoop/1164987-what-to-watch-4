import React from "react";
import PropTypes from "prop-types";
import FilmCard from "../film-card/film-card.jsx";
import withVideo from "../../hocs/with-video/with-video";

const FilmCardWrapped = withVideo(FilmCard);

const FilmsList = (props) => {
  const {films, onTitleClickHandler, onPosterClickHandler} = props;

  return (
    <div className="catalog__movies-list">
      {films.map((film, i) => {
        return <FilmCardWrapped
          key={`${i} - ${film.FILM_TITLE}`}
          film={film}
          onTitleClickHandler={onTitleClickHandler}
          onPosterClickHandler={onPosterClickHandler}
        />;
      })}
    </div>
  );
};

FilmsList.propTypes = {
  films: PropTypes.arrayOf(
      PropTypes.shape({
        FILM_TITLE: PropTypes.string.isRequired,
        FILM_IMAGE: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
  onTitleClickHandler: PropTypes.func.isRequired,
  onPosterClickHandler: PropTypes.func.isRequired
};

export default FilmsList;
