import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import FilmCard from "../film-card/film-card.jsx";

class FilmsList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: {},
    };
  }

  render() {
    const {films, onTitleClickHandler} = this.props;

    return (
      <div className="catalog__movies-list">
        {films.map((film) => {
          return <FilmCard
            key={film.title}
            film={film}
            onTitleClickHandler={onTitleClickHandler}
            onCardHover={(currentFilm) => {
              this.setState({
                activeCard: currentFilm,
              });
            }}/>;
        })}
      </div>
    );
  }
}

FilmsList.propTypes = {
  films: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
  onTitleClickHandler: PropTypes.func.isRequired
};

export default FilmsList;
