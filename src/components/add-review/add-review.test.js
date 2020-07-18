import React from "react";
import renderer from "react-test-renderer";
import AddReview from "./add-review.jsx";

const noop = () => {};

const film = {
  filmTitle: `The Rock`,
  backgroundPoster: `img/bg-the-grand-budapest-hotel.jpg`,
  filmPoster: `img/the-grand-budapest-hotel-poster.jpg`,
};

it(`AddReview component render correctly`, () => {
  const tree = renderer.create(
      <AddReview
        onSubmit={noop}
        film={film}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
