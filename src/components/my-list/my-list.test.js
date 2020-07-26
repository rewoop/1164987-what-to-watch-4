import React from "react";
import * as renderer from "react-test-renderer";
import MyList from "./my-list.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const noop = () => {};
jest.mock(`react-router-dom`);

const films = [
  {
    id: 666,
    filmTitle: `Fantastic Beasts`,
    filmImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    filmVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    filmGenre: `Comedy`
  }
];
it(`Should My List render correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      favoriteFilms: films
    }
  });

  const tree = renderer.create(
      <Provider store={store}>
        <MyList
          films={films}
          loadFavoriteFilms={noop}
        />
      </Provider>
  );
  expect(tree.toJSON()).toMatchSnapshot();
});
