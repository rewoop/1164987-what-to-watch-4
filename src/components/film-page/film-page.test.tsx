import * as React from "react";
import * as renderer from "react-test-renderer";
import FilmPage from "./film-page";
import FilmPageOverview from "../film-page-overview/film-page-overview";
import {Router} from "react-router-dom";
import history from "../../history";
import {noop} from "../../utils";
import {Film, Films} from "../../types";
import {TestFilm, TestFilms} from "../../test-data";

const film: Film = TestFilm;
const films: Films = TestFilms;

const renderActiveTab = () => {
  return <FilmPageOverview
    ratingScore={film.ratingScore}
    ratingLevel={film.ratingLevel}
    ratingCount={film.ratingCount}
    filmDescription={film.filmDescription}
    filmDirector={film.filmDirector}
    filmStarring={film.filmStarring}
  />;
};

it(`Should FilmPage render correctly`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <FilmPage
            film={film}
            sortedFilms={films}
            activeTab={`overview`}
            renderActiveTab={renderActiveTab}
            setActiveTab={noop}
            isSignIn={`NO_AUTH`}
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
