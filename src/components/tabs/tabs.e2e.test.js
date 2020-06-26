import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Tabs from "./tabs.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should tab be clicked`, () => {
  const onLinkClickHandler = jest.fn();

  const tabs = shallow(
      <Tabs
        onLinkClickHandler={onLinkClickHandler}
      />
  );

  const listItems = tabs.find(`.movie-nav__item`);
  listItems.forEach((listItem) => listItem.simulate(`click`));
  expect(onLinkClickHandler).toHaveBeenCalledTimes(listItems.length);
});
