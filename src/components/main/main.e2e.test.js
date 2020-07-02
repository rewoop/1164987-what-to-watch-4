import React from "react";
import Enzyme, {shallow, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main";

const filmsInfo = [
  {
    title: `Fantastic Beasts`,
    image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    link: `movie-page.html`,
    src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    genre: `Comedy`
  }
];

const Settings = {
  FILM_TITLE: `The Rock`,
  FILM_GENRE: `Action`,
  RELEASE_DATE: 1996,
  ACTIVE_GENRE_FILTER: `Action`,
  GENRES_LIST: [`All genres`].concat(Array.from(new Set(filmsInfo.map((film) => film.genre)))),
  IS_MORE_FILMS: true
};

const setFilmsList = (films) => {
  if (films.length < 10) {
    for (let i = 0; films.length < 10; i++) {
      films.push(films[0]);
    }
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
          onPosterClickHandler={() => {}}
          onGenreClickHandler={() => {}}
          onShowButtonClickHandler={() => {}}
          isMoreFilms={Settings.IS_MORE_FILMS}
          activeGenreFilter={Settings.ACTIVE_GENRE_FILTER}
          showedFilmsCount={8}
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
          onTitleClickHandler={() => {}}
          onPosterClickHandler={onPosterClickHandler}
          onGenreClickHandler={() => {}}
          onShowButtonClickHandler={() => {}}
          isMoreFilms={Settings.IS_MORE_FILMS}
          activeGenreFilter={Settings.ACTIVE_GENRE_FILTER}
          showedFilmsCount={8}
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
          onTitleClickHandler={() => {}}
          onPosterClickHandler={() => {}}
          onGenreClickHandler={() => {}}
          isMoreFilms={Settings.IS_MORE_FILMS}
          activeGenreFilter={Settings.ACTIVE_GENRE_FILTER}
          showedFilmsCount={8}
          onShowButtonClickHandler={onShowButtonClickHandler}
        />
    );

    const showBtn = main.find(`.catalog__button`);
    showBtn.simulate(`click`);
    expect(onShowButtonClickHandler).toHaveBeenCalledTimes(1);
  });
});
