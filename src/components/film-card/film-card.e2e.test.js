import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
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

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should film card be hover`, () => {
  const onMouseOver = jest.fn();

  const filmCard = shallow(
      <FilmCard
        films={filmsInfo}
        onTitleClickHandler={() => {}}
        onMouseOver={onMouseOver}
      />
  );

  const filmCards = filmCard.find(`small-movie-card`);

  filmCards.forEach((card) => card.props().onMouseOver());

  expect(onMouseOver.mock.calls.length).toBe(filmCards.length);
});
