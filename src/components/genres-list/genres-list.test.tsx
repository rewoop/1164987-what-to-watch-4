import * as React from "react";
import * as renderer from "react-test-renderer";
import GenresList from "./genres-list";
import {noop} from "../../utils";
import {Films} from "../../types";
import {TestFilms} from "../../test-data";

const films: Films = TestFilms;

const Settings = {
  activeFilter: `Action`,
  genres: [`All genres`].concat(Array.from(new Set(films.map((film) => film.filmGenre))))
};

it(`Should GenresList render correctly`, () => {
  const tree = renderer
    .create(<GenresList
      activeGenreFilter={Settings.activeFilter}
      genres={Settings.genres}
      onGenreClickHandler={noop}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
