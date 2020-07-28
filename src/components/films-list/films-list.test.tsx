import * as React from "react";
import * as renderer from "react-test-renderer";
import FilmsList from "./films-list";
import {Router} from "react-router-dom";
import history from "../../history";
import {Films} from "../../types";
import {TestFilms} from "../../test-data";

const filmsInfo: Films = TestFilms;

it(`Should FilmsList render correctly`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <FilmsList
            films={filmsInfo}
          />
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
