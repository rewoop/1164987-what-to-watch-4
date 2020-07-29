import * as React from "react";
import * as renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import history from "../../history";
import Header from "./header";

it(`Should Header render correctly`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <Header
            isSignIn={`AUTH`}
          />
        </Router>).toJSON();

  expect(tree).toMatchSnapshot();
});
