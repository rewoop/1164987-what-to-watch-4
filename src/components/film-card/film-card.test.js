import React from "react";
import renderer from "react-test-renderer";
import FilmCard from "./film-card.jsx";

const filmsInfo = [
  {
    title: `Fantastic Beasts`,
    image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    link: `movie-page.html`
  },
  {
    title: `Bohemian Rhapsody`,
    image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    link: `movie-page.html`
  },
  {
    title: `Macbeth`,
    image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    link: `movie-page.html`
  },
  {
    title: `The Shawshank Redemption`,
    image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    link: `movie-page.html`
  },
  {
    title: `The Green Mile`,
    image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    link: `movie-page.html`
  },
  {
    title: `Forrest Gump`,
    image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    link: `movie-page.html`
  },
  {
    title: `Schindler's List`,
    image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    link: `movie-page.html`
  },
  {
    title: `Intouchables`,
    image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    link: `movie-page.html`
  }
];

it(`Should FilmCard render correctly`, () => {
  const tree = renderer
    .create(<FilmCard
      films={filmsInfo}
      onTitleClickHandler={() => {}}
      onMouseOver={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
