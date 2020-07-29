import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import Main from "./main";
import {Router} from "react-router-dom";
import history from "../../history";
import {noop} from "../../utils";
import {Film, Films} from "../../types";
import {TestFilm, TestFilms} from "../../test-data";

const getGenresList = (films) => {
  return [`All genres`].concat(Array.from(new Set(films.map((film) => film.filmGenre))));
};

const Settings: Film = TestFilm;

const filmsInfo: Films = TestFilms;

const setFilmsList = () => {
  for (let i = 0; filmsInfo.length < 10; i++) {
    filmsInfo.push(filmsInfo[0]);
  }
  return filmsInfo;
};

configure({adapter: new Adapter()});

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
