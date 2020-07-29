import * as React from "react";
import * as renderer from "react-test-renderer";
import ShowMore from "./show-more";
import {noop} from "../../utils";

it(`Should ShowMore render correctly`, () => {
  const tree = renderer
    .create(<ShowMore
      onShowButtonClickHandler={noop}
    />, {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

  expect(tree).toMatchSnapshot();
});
