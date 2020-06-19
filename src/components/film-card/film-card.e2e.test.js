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

it(`Should Card be hovered with correct args`, () => {
  const onCardHover = jest.fn();
  const onTitleClickHandler = jest.fn();
  const onPosterClickHandler = jest.fn();

  const filmCard = shallow(
      <FilmCard
        film={filmInfo}
        onTitleClickHandler={onTitleClickHandler}
        onPosterClickHandler={onPosterClickHandler}
        onCardHover={onCardHover}
      />
  );

  const card = filmCard.find(`.small-movie-card`);
  const filmTitle = filmCard.find(`.small-movie-card__link`);
  const mockEvent = {
    preventDefault() {}
  };

  card.simulate(`mouseenter`);
  card.props().onClick();
  filmTitle.simulate(`click`, mockEvent);

  expect(onCardHover.mock.calls.length).toBe(1);
  expect(onTitleClickHandler.mock.calls.length).toBe(1);
  expect(onPosterClickHandler.mock.calls.length).toBe(1);
  expect(onCardHover).toHaveBeenCalledWith(filmInfo);
  expect(onTitleClickHandler).toHaveBeenCalledWith(filmInfo);
  expect(onPosterClickHandler).toHaveBeenCalledWith(filmInfo);
});
