import * as React from "react";
import * as renderer from "react-test-renderer";
import Tabs from "./tabs";
import {noop} from "../../utils";

const Settings = {
  currentTab: `overview`
};

it(`Should Tabs render correctly`, () => {
  const tree = renderer
    .create(<Tabs
      onLinkClickHandler={noop}
      currentTab={Settings.currentTab}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
