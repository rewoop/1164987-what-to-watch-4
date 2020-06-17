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
        <FilmCard films={films} onTitleClickHandler={onTitleClickHandler} onMouseOver={(currentFilm) => {
          this.setState({
            activeCard: currentFilm,
          });
        }}/>
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
