import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./sign-in.jsx";

const noop = () => {};

it(`SignIn component render correctly`, () => {
  const tree = renderer.create(
      <SignIn
        onSubmit={noop}
        error={false}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
