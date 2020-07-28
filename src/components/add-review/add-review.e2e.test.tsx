import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import AddReview from "./add-review";
import {noop} from "../../utils";
import {Film, PostReview} from "../../types";
import {TestFilm} from "../../test-data";

configure({adapter: new Adapter()});

const mockEvent = {
  preventDefault: noop,
};

const Settings: PostReview = {
  rating: 5,
  comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
};

const film: Film = TestFilm;

it(`Should form be submited`, () => {
  const onSubmitHandler = jest.fn();

  const addReview = shallow(
      <AddReview
        film={film}
        isDisable={false}
        rating={Settings.rating}
        comment={Settings.comment}
        onSubmitHandler={onSubmitHandler}
        onChangeHandler={noop}
      />
  );

  const form = addReview.find(`.add-review__form`);
  form.simulate(`submit`, mockEvent);

  expect(onSubmitHandler).toHaveBeenCalledTimes(1);
  expect(onSubmitHandler).toHaveBeenCalledWith(mockEvent);
});

it(`Should inputs be changed`, () => {
  const onChangeHandler = jest.fn();

  const addReview = shallow(
      <AddReview
        film={film}
        isDisable={false}
        rating={Settings.rating}
        comment={Settings.comment}
        onSubmitHandler={noop}
        onChangeHandler={onChangeHandler}
      />
  );

  const ratingStars = addReview.find(`.rating__input`);
  const comment = addReview.find(`.add-review__textarea`);
  ratingStars.at(4).simulate(`change`, mockEvent);
  comment.simulate(`change`, mockEvent);

  expect(onChangeHandler).toHaveBeenCalledTimes(2);
  expect(onChangeHandler).toHaveBeenCalledWith(mockEvent);
});
