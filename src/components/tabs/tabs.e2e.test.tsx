import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import Tabs from "./tabs";
import {Tab} from "../../const";

const Settings = {
  currentTab: `overview`
};

configure({adapter: new Adapter()});

it(`Should tab be clicked`, () => {
  const onLinkClickHandler = jest.fn();

  const tabs = shallow(
      <Tabs
        onLinkClickHandler={onLinkClickHandler}
        currentTab={Settings.currentTab}
      />
  );

  const listItems = tabs.find(`.movie-nav__item`);
  listItems.forEach((listItem) => listItem.simulate(`click`));
  expect(onLinkClickHandler).toHaveBeenCalledTimes(listItems.length);
  expect(onLinkClickHandler.mock.calls[0][0]).toBe(Tab.OVERVIEW);
  expect(onLinkClickHandler.mock.calls[1][0]).toBe(Tab.DETAILS);
  expect(onLinkClickHandler.mock.calls[2][0]).toBe(Tab.REVIEWS);
});
