import React, {Fragment} from "react";
import PropTypes from "prop-types";

const GenresList = (props) => {
  const {genres, onGenreClickHandler, activeGenreFilter} = props;

  return (
    <Fragment>
      <ul className="catalog__genres-list">
        {genres.map((genre) => {
          return (
            <li key={genre} className={ activeGenreFilter === genre ?
              `catalog__genres-item catalog__genres-item--active` : `catalog__genres-item`}
            onClick={() => onGenreClickHandler(genre)}
            >
              <a href="#" className="catalog__genres-link">{genre}</a>
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
};

GenresList.propTypes = {
  activeGenreFilter: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(
      PropTypes.string.isRequired
  ).isRequired,
  onGenreClickHandler: PropTypes.func.isRequired
};

export default GenresList;
