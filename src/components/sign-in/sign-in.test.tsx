import * as React from "react";
import * as renderer from "react-test-renderer";
import SignIn from "./sign-in";
import {Router} from "react-router-dom";
import history from "../../history";
import {noop} from "../../utils";

it(`SignIn component render correctly`, () => {
  const tree = renderer.create(
      <Router history={history}>
        <SignIn
          onSubmit={noop}
          isValid={true}
        />
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`SignIn component render correctly`, () => {
  const tree = renderer.create(
      <Router history={history}>
        <SignIn
          onSubmit={noop}
          isValid={false}
        />
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
