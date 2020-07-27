import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import GenresList from "./genres-list.jsx";

const films = [
  {
    title: `Fantastic Beasts`,
    image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    link: `movie-page.html`,
    src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    genre: `Comedy`
  }
];

const Settings = {
  activeFilter: `Action`,
  genres: [`All genres`].concat(Array.from(new Set(films.map((film) => film.genre))))
};

Enzyme.configure({
  adapter: new Adapter(),
});

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
  expect(onGenreClickHandler.mock.calls[1][0]).toBe(`Comedy`);
});
