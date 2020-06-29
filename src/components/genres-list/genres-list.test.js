import React from "react";
import renderer from "react-test-renderer";
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

it(`Should GenresList render correctly`, () => {
  const tree = renderer
    .create(<GenresList
      activeGenreFilter={Settings.activeFilter}
      genres={Settings.genres}
      onGenreClickHandler={() => {}}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
