import * as React from "react";
import * as renderer from "react-test-renderer";
import FilmPageReview from "./film-page-review";
import {TestComment} from "../../test-data";
import {FilmComment} from "../../types";

const commentMock: FilmComment = TestComment;

it(`Should FilmPageReview render correctly`, () => {
  const tree = renderer
    .create(<FilmPageReview
      review={commentMock}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
