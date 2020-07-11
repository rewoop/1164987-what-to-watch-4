import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FilmCard from "./film-card.jsx";

const filmInfo = {
  id: 1,
  FILM_TITLE: `Fantastic Beasts`,
  FILM_IMAGE: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  FILM_VIDEO: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Should film card work right`, () => {
  it(`Should card title be pressed`, () => {
    const onTitleClickHandler = jest.fn();

    const filmCard = shallow(
        <FilmCard
          film={filmInfo}
          onTitleClickHandler={onTitleClickHandler}
          onPosterClickHandler={() => {}}
          onCardHover={() => {}}
          isPlaying={false}
          setPlayingFilm={() => {}}
        />
    );

    const mockEvent = {
      preventDefault() {}
    };

    const filmTitle = filmCard.find(`.small-movie-card__link`);
    filmTitle.simulate(`click`, mockEvent);

    expect(onTitleClickHandler).toHaveBeenCalledTimes(1);
    expect(onTitleClickHandler).toHaveBeenCalledWith(filmInfo);
  });

  it(`Should card poster click`, () => {
    const onPosterClickHandler = jest.fn();

    const filmCard = shallow(
        <FilmCard
          film={filmInfo}
          onTitleClickHandler={() => {}}
          onPosterClickHandler={onPosterClickHandler}
          onCardHover={() => {}}
          isPlaying={false}
          setPlayingFilm={() => {}}
        />
    );

    const card = filmCard.find(`.small-movie-card`);
    card.simulate(`click`);

    expect(onPosterClickHandler).toHaveBeenCalledTimes(1);
    expect(onPosterClickHandler).toHaveBeenCalledWith(filmInfo);
  });
});
