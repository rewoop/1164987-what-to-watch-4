import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import GenresList from "./genres-list";
import {Films} from "../../types";
import {TestFilms} from "../../test-data";

const films: Films = TestFilms;

const Settings = {
  activeFilter: `Action`,
  genres: [`All genres`].concat(Array.from(new Set(films.map((film) => film.filmGenre))))
};

configure({adapter: new Adapter()});

it(`Should genre be clicked`, () => {
  const onGenreClickHandler = jest.fn();

  const genresList = shallow(
      <GenresList
        activeGenreFilter={Settings.activeFilter}
        genres={Settings.genres}
        onGenreClickHandler={onGenreClickHandler}
      />
  );

  const listItems = genresList.find(`.catalog__genres-item`);
  listItems.forEach((listItem) => listItem.simulate(`click`));
  expect(onGenreClickHandler).toHaveBeenCalledTimes(listItems.length);
  expect(onGenreClickHandler.mock.calls[0][0]).toBe(`All genres`);
  expect(onGenreClickHandler.mock.calls[1][0]).toBe(`Thriller`);
});
