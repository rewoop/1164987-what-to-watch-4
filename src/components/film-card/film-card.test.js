import React from "react";
import renderer from "react-test-renderer";
import FilmCard from "./film-card.jsx";

const filmInfo = {
  title: `Fantastic Beasts`,
  image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  link: `movie-page.html`
};

it(`Should FilmCard render correctly`, () => {
  const tree = renderer
    .create(<FilmCard
      film={filmInfo}
      onTitleClickHandler={() => {}}
      onMouseEnter={() => {}}
      onMouseLeave={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
