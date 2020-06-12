import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";


const App = (props) => {
  const {filmTitle, filmGenre, filmReleaseDate, films} = props;

  return (
    <Main title={filmTitle}
      genre={filmGenre}
      releaseDate={filmReleaseDate}
      films={films}
    />
  );
};

App.propTypes = {
  filmTitle: PropTypes.string.isRequired,
  filmGenre: PropTypes.string.isRequired,
  filmReleaseDate: PropTypes.number.isRequired,
  films: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default App;
