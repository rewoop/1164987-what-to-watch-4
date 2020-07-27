import React from "react";
import renderer from "react-test-renderer";
import ShowMore from "./show-more.jsx";

it(`Should ShowMore render correctly`, () => {
  const tree = renderer
    .create(<ShowMore
      onShowButtonClickHandler={() => {}}
    />, {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

  expect(tree).toMatchSnapshot();
});
