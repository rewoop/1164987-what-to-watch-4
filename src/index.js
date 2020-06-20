import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import films from "./mocks/films";
import film from "./mocks/film.js";

ReactDOM.render(
    <App
      filmTitle={film.FILM_TITLE}
      filmGenre={film.FILM_GENRE}
      filmReleaseDate={film.RELEASE_DATE}
      films={films}
      backgroundFilmPoster={film.BACKGROUND_POSTER}
      filmPoster={film.FILM_POSTER}
      ratingScore={film.RATING.SCORE}
      ratingLevel={film.RATING.LEVEL}
      ratingCount={film.RATING.COUNT}
      filmDescription={film.FILM_DESCRIPTION}
      filmDirector={film.FILM_DIRECTOR}
      filmStarring={film.FILM_STARRING}
    />,
    document.querySelector(`#root`)
);
