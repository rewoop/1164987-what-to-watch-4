import React from "react";
import PropTypes from "prop-types";
import FilmCard from "../film-card/film-card.jsx";
import withVideo from "../../hocs/with-video/with-video";

const FilmCardWrapped = withVideo(FilmCard);

const FilmsList = (props) => {
  const {films} = props;

  return (
    <div className="catalog__movies-list">
      {films.map((film, i) => {
        return <FilmCardWrapped
          key={`${i} - ${film.filmTitle}`}
          film={film}
        />;
      })}
    </div>
  );
};

FilmsList.propTypes = {
  films: PropTypes.arrayOf(
      PropTypes.shape({
        filmTitle: PropTypes.string.isRequired,
        filmImage: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
};

export default FilmsList;
