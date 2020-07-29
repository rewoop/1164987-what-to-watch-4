import * as React from "react";
import * as renderer from "react-test-renderer";
import {App} from "./app";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {noop} from "../../utils";
import {Film, Films, FilmComments} from "../../types";
import {TestFilm, TestFilms, TestComments} from "../../test-data";

const mockStore = configureStore([]);

const filmMock: Film = TestFilm;
const filmsMock: Films = TestFilms;

const comments: FilmComments = TestComments;

it(`Render App`, () => {
  const store = mockStore({
    genre: `All genres`
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            promoFilm={filmMock}
            films={filmsMock}
            onShowButtonClickHandler={noop}
            isMoreFilms={true}
            activeGenreFilter={`All genres`}
            genresList={[`All genres`].concat(Array.from(new Set(filmsMock.map((film) => film.filmGenre))))}
            onGenreClickHandler={noop}
            showedFilmsCount={8}
            filmsByGenre={filmMock.filmGenre === `All genres` ? filmsMock : filmsMock.filter((currentFilm) => currentFilm.filmGenre === filmMock.filmGenre)}
            authorizationStatus={`NO_AUTH`}
            login={noop}
            filmComments={comments}
            getCommentByFilmId={noop}
            isErrorLoadingFilms={false}
            isLoadingFilms={false}
            isValidAuthorization={false}
            postFilmComment={noop}
            isDisableReviewForm={false}
            isLoadingPromoFilm={false}
            onMyListClickHandler={noop}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
