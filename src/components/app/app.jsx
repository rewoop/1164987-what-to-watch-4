import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  onTitleClickHandler() {}

  render() {
    const {filmTitle, filmGenre, filmReleaseDate, films} = this.props;

    return (
      <Main title={filmTitle}
        genre={filmGenre}
        releaseDate={filmReleaseDate}
        films={films}
        onTitleClickHandler={this.onTitleClickHandler}
      />
    );
  }
}

App.propTypes = {
  filmTitle: PropTypes.string.isRequired,
  filmGenre: PropTypes.string.isRequired,
  filmReleaseDate: PropTypes.number.isRequired,
  films: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired
};

export default App;
