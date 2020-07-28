import * as React from "react";
import * as renderer from "react-test-renderer";
import FilmPageDetails from "./film-page-details";

const Settings = {
  FILM_GENRE: `Thriller`,
  RELEASE_DATE: 1996,
  RUN_TIME: `1h 39m`,
  FILM_DIRECTOR: `Wes Andreson`,
  FILM_STARRING: [
    `Bill Murray`,
    `Edward Norton`,
    `Jude Law`,
    `Willem Dafoe`,
    `Tom Cruz`
  ],
};

it(`Should FilmPageDetails render correctly`, () => {
  const tree = renderer
    .create(<FilmPageDetails
      genre={Settings.FILM_GENRE}
      releaseDate={Settings.RELEASE_DATE}
      filmDirector={Settings.FILM_DIRECTOR}
      filmStarring={Settings.FILM_STARRING}
      runTime={Settings.RUN_TIME}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
