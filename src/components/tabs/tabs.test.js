import React from "react";
import renderer from "react-test-renderer";
import Tabs from "./tabs";

it(`Should Tabs render correctly`, () => {
  const tree = renderer
    .create(<Tabs
      onLinkClickHandler={() => {}}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
