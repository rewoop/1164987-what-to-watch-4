import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./sign-in.jsx";

const noop = () => {};

it(`SignIn component render correctly`, () => {
  const tree = renderer.create(
      <SignIn
        onSubmit={noop}
        isValid={true}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
