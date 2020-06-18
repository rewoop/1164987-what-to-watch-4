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

  const filmCard = shallow(
      <FilmCard
        film={filmInfo}
        onTitleClickHandler={() => {}}
        onCardHover={onCardHover}
      />
  );

  const card = filmCard.find(`.small-movie-card`);
  card.simulate(`mouseenter`);

  expect(onCardHover.mock.calls.length).toBe(1);
  expect(onCardHover).toHaveBeenCalledWith(filmInfo);
});
