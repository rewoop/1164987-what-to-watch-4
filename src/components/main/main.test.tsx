import * as React from "react";
import * as renderer from "react-test-renderer";
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

it(`Should Main render correctly`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <Main
            film={Settings}
            films={filmsInfo}
            onGenreClickHandler={noop}
            onShowButtonClickHandler={noop}
            isMoreFilms={true}
            activeGenreFilter={`All genres`}
            showedFilmsCount={8}
            isSignIn={`NO_AUTH`}
            genres={getGenresList(filmsInfo)}
            isErrorLoadingFilms={false}
            onMyListClickHandler={noop}
            isFavoriteStatus={true}
          />
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
