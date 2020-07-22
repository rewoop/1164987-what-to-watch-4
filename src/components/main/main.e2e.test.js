import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main";
import {Router} from "react-router-dom";
import history from "../../history.js";

const noop = () => {};

const getGenresList = (films) => {
  return [`All genres`].concat(Array.from(new Set(films.map((film) => film.filmGenre))));
};

const filmsInfo = [
  {
    filmTitle: `Fantastic Beasts`,
    filmImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    filmVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    filmGenre: `Comedy`
  }
];

const Settings = {
  filmTitle: `The Rock`,
  filmGenre: `Thriller`,
  filmVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  releaseDate: 1996,
  backgroundPoster: `img/bg-the-grand-budapest-hotel.jpg`,
  filmPoster: `img/the-grand-budapest-hotel-poster.jpg`,
};

const PlayerSettings = {
  filmVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  filmTitle: `The Rock`,
};

const setFilmsList = (films) => {
  for (let i = 0; films.length < 10; i++) {
    films.push(films[0]);
  }
  return films;
};

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Should Main work right`, () => {
  it(`Should film title be clicked`, () => {
    const onTitleClickHandler = jest.fn();

    const main = mount(
        <Router history={history}>
          <Main
            promoFilm={Settings}
            films={filmsInfo}
            onTitleClickHandler={onTitleClickHandler}
            onPosterClickHandler={noop}
            onGenreClickHandler={noop}
            onShowButtonClickHandler={noop}
            isMoreFilms={true}
            activeGenreFilter={`All genres`}
            showedFilmsCount={8}
            onPlayButtonClickHandler={noop}
            isSignIn={`NO_AUTH`}
            genres={getGenresList(filmsInfo)}
            isErrorLoadingFilms={false}
          />
        </Router>
    );

    const filmTitles = main.find(`.small-movie-card__link`);
    filmTitles.forEach((filmTitle) => filmTitle.simulate(`click`));
    expect(onTitleClickHandler).toHaveBeenCalledTimes(filmTitles.length);
  });

  it(`Should film poster be clicked`, () => {
    const onPosterClickHandler = jest.fn();

    const main = mount(
        <Router history={history}>
          <Main
            promoFilm={Settings}
            films={setFilmsList(filmsInfo)}
            onTitleClickHandler={noop}
            onPosterClickHandler={onPosterClickHandler}
            onGenreClickHandler={noop}
            onShowButtonClickHandler={noop}
            isMoreFilms={true}
            activeGenreFilter={`All genres`}
            showedFilmsCount={8}
            onPlayButtonClickHandler={noop}
            isSignIn={`NO_AUTH`}
            genres={getGenresList(filmsInfo)}
            isErrorLoadingFilms={false}
          />
        </Router>
    );

    const filmPosters = main.find(`.small-movie-card > a`);
    filmPosters.forEach((filmPoster) => filmPoster.simulate(`click`));
    expect(onPosterClickHandler).toHaveBeenCalledTimes(filmPosters.length);
  });

  it(`Should show button be clicked`, () => {
    const onShowButtonClickHandler = jest.fn();

    const main = mount(
        <Router history={history}>
          <Main
            promoFilm={Settings}
            films={filmsInfo}
            onTitleClickHandler={noop}
            onPosterClickHandler={noop}
            onGenreClickHandler={noop}
            isMoreFilms={true}
            activeGenreFilter={`All genres`}
            showedFilmsCount={8}
            onShowButtonClickHandler={onShowButtonClickHandler}
            onPlayButtonClickHandler={noop}
            isSignIn={`NO_AUTH`}
            genres={getGenresList(filmsInfo)}
            isErrorLoadingFilms={false}
          />
        </Router>
    );

    const showBtn = main.find(`.catalog__button`);
    showBtn.simulate(`click`);
    expect(onShowButtonClickHandler).toHaveBeenCalledTimes(1);
  });

  it(`Should play button be clicked`, () => {
    const onPlayButtonClickHandler = jest.fn();

    const main = mount(
        <Router history={history}>
          <Main
            promoFilm={Settings}
            films={filmsInfo}
            onTitleClickHandler={noop}
            onPosterClickHandler={noop}
            onGenreClickHandler={noop}
            isMoreFilms={true}
            activeGenreFilter={`All genres`}
            showedFilmsCount={8}
            onShowButtonClickHandler={noop}
            onPlayButtonClickHandler={onPlayButtonClickHandler}
            isSignIn={`NO_AUTH`}
            genres={getGenresList(filmsInfo)}
            isErrorLoadingFilms={false}
          />
        </Router>
    );

    const playBtn = main.find(`.btn--play`);
    playBtn.forEach((btn) => btn.simulate(`click`));
    expect(onPlayButtonClickHandler).toHaveBeenCalledTimes(3);
    expect(onPlayButtonClickHandler).toHaveBeenCalledWith(PlayerSettings);
  });
});
