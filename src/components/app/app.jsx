import React from "react";
import Main from "../main/main.jsx";


const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {filmTitle, filmGenre, filmReleaseDate} = props;

  return (
    <Main title={filmTitle}
      genre={filmGenre}
      releaseDate={filmReleaseDate}
    />
  );
};


export default App;
