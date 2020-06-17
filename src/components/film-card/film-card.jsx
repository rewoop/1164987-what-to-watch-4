import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class FilmCard extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {films, onTitleClickHandler, onMouseOver} = this.props;

    return (
      films.map((film) => {
        return <article key={film.title} className="small-movie-card catalog__movies-card"
          onMouseOver={() => onMouseOver(film)}>
          <div className="small-movie-card__image">
            <img src={film.image} alt={film.title} width="280" height="175"/>
          </div>
          <h3 className="small-movie-card__title">
            <a onClick={onTitleClickHandler} className="small-movie-card__link" href={film.link}>{film.title}</a>
          </h3>
        </article>;
      })
    );
  }
}

FilmCard.propTypes = {
  films: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
  onTitleClickHandler: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
};

export default FilmCard;
