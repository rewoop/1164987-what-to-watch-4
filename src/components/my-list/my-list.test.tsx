import * as React from "react";
import * as renderer from "react-test-renderer";
import {MyList} from "./my-list";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import thunk from 'redux-thunk';
import {noop} from "../../utils";
import {Films} from "../../types";
import {TestFilms} from "../../test-data";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock(`react-router-dom`);

const filmsInfo: Films = TestFilms;

it(`Should My List render correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      favoriteFilms: filmsInfo
    }
  });

  const tree = renderer.create(
      <Provider store={store}>
        <MyList
          films={filmsInfo}
          loadFavoriteFilms={noop}
        />
      </Provider>
  );
  expect(tree.toJSON()).toMatchSnapshot();
});
