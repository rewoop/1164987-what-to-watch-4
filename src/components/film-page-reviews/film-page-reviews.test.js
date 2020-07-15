import React from "react";
import renderer from "react-test-renderer";
import FilmPageReviews from "./film-page-reviews";

const Settings = [
  {
    id: 0,
    user: {
      id: 1,
      name: `Kate Muir`,
    },
    comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    date: `December 24, 2016`,
    rating: 9,
  },
  {
    id: 1,
    user: {
      id: 2,
      name: `Bill Goodykoontz`,
    },
    comment: `Anderson's films are too precious for some, but for those of us willing to lose ourselves in them, they're a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.`,
    date: `November 18, 2015`,
    rating: 8,
  },
  {
    id: 2,
    user: {
      id: 3,
      name: `Amanda Greever`,
    },
    comment: `I didn't find it amusing, and while I can appreciate the creativity, it's an hour and 40 minutes I wish I could take back.`,
    date: `November 18, 2015`,
    rating: 8,
  },
];

it(`Should FilmPageReviews render correctly`, () => {
  const tree = renderer
    .create(<FilmPageReviews
      reviews={Settings}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
