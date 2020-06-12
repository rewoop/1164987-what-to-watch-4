import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const Settings = {
  FILM_TITLE: `The Rock`,
  FILM_GENRE: `Action`,
  RELEASE_DATE: 1996
};

const films = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`];

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      filmTitle={Settings.FILM_TITLE}
      filmGenre={Settings.FILM_GENRE}
      filmReleaseDate={Settings.RELEASE_DATE}
      films={films}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
