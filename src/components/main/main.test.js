import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";

const Settings = {
  FILM_TITLE: `The Rock`,
  FILM_GENRE: `Action`,
  RELEASE_DATE: 1996
};

const films = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`];

it(`Should Main render correctly`, () => {
  const tree = renderer
    .create(<Main
      title={Settings.FILM_TITLE}
      genre={Settings.FILM_GENRE}
      releaseDate={Settings.RELEASE_DATE}
      films={films}
      onTitleClickHandler={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
