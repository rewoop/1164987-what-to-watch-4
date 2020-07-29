import * as React from "react";
import * as renderer from "react-test-renderer";
import FilmPageReviews from "./film-page-reviews";
import {TestComments} from "../../test-data";
import {FilmComments} from "../../types";

const commentsMock: FilmComments = TestComments;

it(`Should FilmPageReviews render correctly`, () => {
  const tree = renderer
    .create(<FilmPageReviews
      reviews={commentsMock}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
