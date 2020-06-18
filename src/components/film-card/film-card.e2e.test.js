import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FilmCard from "./film-card.jsx";

const filmInfo = {
  title: `Fantastic Beasts`,
  image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  link: `movie-page.html`
};

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should film card be hover`, () => {
  const onMouseEnter = jest.fn();
  const onMouseLeave = jest.fn();

  const filmCard = shallow(
      <FilmCard
        film={filmInfo}
        onTitleClickHandler={() => {}}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
  );

  const filmCards = filmCard.find(`small-movie-card`);

  filmCards.forEach((card) => card.props().onMouseEnter());
  filmCards.forEach((card) => card.props().onMouseLeave());

  expect(onMouseEnter.mock.calls.length).toBe(filmCards.length);
  expect(onMouseLeave.mock.calls.length).toBe(filmCards.length);
});
