import React from "react";
import renderer from "react-test-renderer";
import FilmPageReview from "./film-page-review";

const Settings = {
  id: 1,
  user: {
    id: 2,
    name: `Valera`,
  },
  comment: `lalala`,
  date: `12 July 1996`,
  rating: 5,
};

it(`Should FilmPageReview render correctly`, () => {
  const tree = renderer
    .create(<FilmPageReview
      review={Settings}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
