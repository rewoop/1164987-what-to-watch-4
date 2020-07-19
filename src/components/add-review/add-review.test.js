import React from "react";
import renderer from "react-test-renderer";
import AddReview from "./add-review.jsx";

const noop = () => {};

const film = {
  filmTitle: `The Rock`,
  backgroundPoster: `img/bg-the-grand-budapest-hotel.jpg`,
  filmPoster: `img/the-grand-budapest-hotel-poster.jpg`,
};

const Settings = {
  rating: 5,
  comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`
};

it(`AddReview component render correctly`, () => {
  const tree = renderer.create(
      <AddReview
        film={film}
        isDisable={false}
        rating={Settings.rating}
        comment={Settings.comment}
        onSubmitHandler={noop}
        onChangeHandler={noop}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
