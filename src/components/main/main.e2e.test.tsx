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
    id: 666,
    filmTitle: `Fantastic Beasts`,
    filmImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    filmVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    filmGenre: `Comedy`
  }
];

const Settings = {
  id: 666,
  filmTitle: `The Rock`,
  filmGenre: `Thriller`,
  filmVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  releaseDate: 1996,
  backgroundPoster: `img/bg-the-grand-budapest-hotel.jpg`,
  filmPoster: `img/the-grand-budapest-hotel-poster.jpg`,
  isFavoriteFilm: true
};

const setFilmsList = () => {
  for (let i = 0; filmsInfo.length < 10; i++) {
    filmsInfo.push(filmsInfo[0]);
  }
  return filmsInfo;
};

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Should Main work right`, () => {
  it(`Should show button be clicked`, () => {
    const onShowButtonClickHandler = jest.fn();

    const main = mount(
        <Router history={history}>
          <Main
            film={Settings}
            films={setFilmsList()}
            onGenreClickHandler={noop}
            isMoreFilms={true}
            activeGenreFilter={`All genres`}
            showedFilmsCount={8}
            onShowButtonClickHandler={onShowButtonClickHandler}
            isSignIn={`NO_AUTH`}
            genres={getGenresList(filmsInfo)}
            isErrorLoadingFilms={false}
            onMyListClickHandler={noop}
            isFavoriteStatus={true}
          />
        </Router>
    );

    const showBtn = main.find(`.catalog__button`);
    showBtn.simulate(`click`);
    expect(onShowButtonClickHandler).toHaveBeenCalledTimes(1);
  });
});
