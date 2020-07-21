import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FilmCard from "./film-card.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";

const filmInfo = {
  id: 1,
  filmTitle: `Fantastic Beasts`,
  filmImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  filmVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Should film card work right`, () => {
  it(`Should card title be pressed`, () => {
    const onTitleClickHandler = jest.fn();

    const filmCard = mount(
        <Router history={history}>
          <FilmCard
            film={filmInfo}
            onTitleClickHandler={onTitleClickHandler}
            onPosterClickHandler={() => {}}
            onCardHover={() => {}}
            isPlaying={false}
            setPlayingFilm={() => {}}
          />
        </Router>
    );

    const mockEvent = {
      preventDefault() {}
    };

    const filmTitle = filmCard.find(`.small-movie-card__link`);
    filmTitle.forEach((title) => title.simulate(`click`, mockEvent));

    expect(onTitleClickHandler).toHaveBeenCalledTimes(3);
    expect(onTitleClickHandler).toHaveBeenCalledWith(filmInfo);
  });

  it(`Should card poster click`, () => {
    const onPosterClickHandler = jest.fn();

    const filmCard = mount(
        <Router history={history}>
          <FilmCard
            film={filmInfo}
            onTitleClickHandler={() => {}}
            onPosterClickHandler={onPosterClickHandler}
            onCardHover={() => {}}
            isPlaying={false}
            setPlayingFilm={() => {}}
          />
        </Router>
    );

    const card = filmCard.find(`.small-movie-card`);
    card.simulate(`click`);

    expect(onPosterClickHandler).toHaveBeenCalledTimes(1);
    expect(onPosterClickHandler).toHaveBeenCalledWith(filmInfo);
  });
});
