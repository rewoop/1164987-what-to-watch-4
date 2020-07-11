import React from "react";
import Enzyme, {shallow, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main";

const noop = () => {};

const filmsInfo = [
  {
    filmTitle: `Fantastic Beasts`,
    filmImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    filmVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    filmGenre: `Comedy`
  }
];

const Settings = {
  FILM_TITLE: `The Rock`,
  FILM_GENRE: `Action`,
  RELEASE_DATE: 1996,
  ACTIVE_GENRE_FILTER: `Action`,
  GENRES_LIST: [`All genres`].concat(Array.from(new Set(filmsInfo.map((film) => film.filmGenre)))),
  IS_MORE_FILMS: true,
  FILM_SRC: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
};

const PlayerSettings = {
  src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  title: `The Rock`,
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

    const main = shallow(
        <Main
          title={Settings.FILM_TITLE}
          genre={Settings.FILM_GENRE}
          genres={Settings.GENRES_LIST}
          releaseDate={Settings.RELEASE_DATE}
          films={filmsInfo}
          onTitleClickHandler={onTitleClickHandler}
          onPosterClickHandler={noop}
          onGenreClickHandler={noop}
          onShowButtonClickHandler={noop}
          isMoreFilms={Settings.IS_MORE_FILMS}
          activeGenreFilter={Settings.ACTIVE_GENRE_FILTER}
          showedFilmsCount={8}
          src={Settings.FILM_SRC}
          onPlayButtonClickHandler={noop}
          isSignIn={`NO_AUTH`}
          onSignInClickHandler={noop}
        />
    );

    const filmTitles = main.find(`.small-movie-card__link`);
    filmTitles.forEach((filmTitle) => filmTitle.simulate(`click`));
    expect(onTitleClickHandler).toHaveBeenCalledTimes(filmTitles.length);
  });

  it(`Should film poster be clicked`, () => {
    const onPosterClickHandler = jest.fn();

    const main = shallow(
        <Main
          title={Settings.FILM_TITLE}
          genre={Settings.FILM_GENRE}
          genres={Settings.GENRES_LIST}
          releaseDate={Settings.RELEASE_DATE}
          films={setFilmsList(filmsInfo)}
          onTitleClickHandler={noop}
          onPosterClickHandler={onPosterClickHandler}
          onGenreClickHandler={noop}
          onShowButtonClickHandler={noop}
          isMoreFilms={Settings.IS_MORE_FILMS}
          activeGenreFilter={Settings.ACTIVE_GENRE_FILTER}
          showedFilmsCount={8}
          src={Settings.FILM_SRC}
          onPlayButtonClickHandler={noop}
          isSignIn={`NO_AUTH`}
          onSignInClickHandler={noop}
        />
    );

    const filmPosters = main.find(`.small-movie-card`);
    filmPosters.forEach((filmPoster) => filmPoster.simulate(`click`));
    expect(onPosterClickHandler).toHaveBeenCalledTimes(filmPosters.length);
  });

  it(`Should show button be clicked`, () => {
    const onShowButtonClickHandler = jest.fn();

    const main = mount(
        <Main
          title={Settings.FILM_TITLE}
          genre={Settings.FILM_GENRE}
          genres={Settings.GENRES_LIST}
          releaseDate={Settings.RELEASE_DATE}
          films={filmsInfo}
          onTitleClickHandler={noop}
          onPosterClickHandler={noop}
          onGenreClickHandler={noop}
          isMoreFilms={Settings.IS_MORE_FILMS}
          activeGenreFilter={Settings.ACTIVE_GENRE_FILTER}
          showedFilmsCount={8}
          onShowButtonClickHandler={onShowButtonClickHandler}
          src={Settings.FILM_SRC}
          onPlayButtonClickHandler={noop}
          isSignIn={`NO_AUTH`}
          onSignInClickHandler={noop}
        />
    );

    const showBtn = main.find(`.catalog__button`);
    showBtn.simulate(`click`);
    expect(onShowButtonClickHandler).toHaveBeenCalledTimes(1);
  });

  it(`Should play button be clicked`, () => {
    const onPlayButtonClickHandler = jest.fn();

    const main = mount(
        <Main
          title={Settings.FILM_TITLE}
          genre={Settings.FILM_GENRE}
          genres={Settings.GENRES_LIST}
          releaseDate={Settings.RELEASE_DATE}
          films={filmsInfo}
          onTitleClickHandler={noop}
          onPosterClickHandler={noop}
          onGenreClickHandler={noop}
          isMoreFilms={Settings.IS_MORE_FILMS}
          activeGenreFilter={Settings.ACTIVE_GENRE_FILTER}
          showedFilmsCount={8}
          onShowButtonClickHandler={noop}
          src={Settings.FILM_SRC}
          onPlayButtonClickHandler={onPlayButtonClickHandler}
          isSignIn={`NO_AUTH`}
          onSignInClickHandler={noop}
        />
    );

    const playBtn = main.find(`.btn--play`);
    playBtn.simulate(`click`);
    expect(onPlayButtonClickHandler).toHaveBeenCalledTimes(1);
    expect(onPlayButtonClickHandler).toHaveBeenCalledWith(PlayerSettings);
  });

  it(`Should sign in link be clicked`, () => {
    const onSignInClickHandler = jest.fn();

    const main = mount(
        <Main
          title={Settings.FILM_TITLE}
          genre={Settings.FILM_GENRE}
          genres={Settings.GENRES_LIST}
          releaseDate={Settings.RELEASE_DATE}
          films={filmsInfo}
          onTitleClickHandler={noop}
          onPosterClickHandler={noop}
          onGenreClickHandler={noop}
          isMoreFilms={Settings.IS_MORE_FILMS}
          activeGenreFilter={Settings.ACTIVE_GENRE_FILTER}
          showedFilmsCount={8}
          onShowButtonClickHandler={noop}
          src={Settings.FILM_SRC}
          onPlayButtonClickHandler={noop}
          isSignIn={`NO_AUTH`}
          onSignInClickHandler={onSignInClickHandler}
        />
    );

    const signInBtn = main.find(`.user-block a`);
    signInBtn.simulate(`click`);
    expect(onSignInClickHandler).toHaveBeenCalledTimes(1);
  });
});
