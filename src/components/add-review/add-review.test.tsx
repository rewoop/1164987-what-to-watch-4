import * as React from "react";
import * as renderer from "react-test-renderer";
import AddReview from "./add-review";
import {Router} from "react-router-dom";
import history from "../../history";
import {noop} from "../../utils";
import {Film, PostReview} from "../../types";
import {TestFilm} from "../../test-data";

const Settings: PostReview = {
  rating: 5,
  comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
};

const film: Film = TestFilm;

it(`AddReview component render correctly`, () => {
  const tree = renderer.create(
      <Router history={history}>
        <AddReview
          film={film}
          isDisable={false}
          rating={Settings.rating}
          comment={Settings.comment}
          onSubmitHandler={noop}
          onChangeHandler={noop}
        />
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
