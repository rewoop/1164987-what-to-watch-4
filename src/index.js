import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const Settings = {
  FILM_TITLE: `The Rock`,
  FILM_GENRE: `Action`,
  RELEASE_DATE: `1996`
};

ReactDOM.render(
    <App
      filmTitle={Settings.FILM_TITLE}
      filmGenre={Settings.FILM_GENRE}
      filmReleaseDate={Settings.RELEASE_DATE}
    />,
    document.querySelector(`#root`)
);
