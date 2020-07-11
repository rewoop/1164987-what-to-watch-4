import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./sign-in.js";

const noop = () => {};

it(`SignIn component render correctly`, () => {
  const tree = renderer.create(
      <SignIn
        onSubmit={noop}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
