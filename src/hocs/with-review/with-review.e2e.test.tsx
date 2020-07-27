import React from "react";
import PropTypes from "prop-types";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withReview from "./with-review.tsx";
import {ReviewLength} from "../../const.js";

const filmInfo = {
  filmTitle: `The Rock`,
  backgroundPoster: `img/bg-the-grand-budapest-hotel.jpg`,
  filmPoster: `img/the-grand-budapest-hotel-poster.jpg`,
};

const Settings = {
  rating: 5,
  comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
};

const AddReview = (props) => {
  const {isDisable, onSubmitHandler, onChangeHandler} = props;

  return (
    <form action="#" className="add-review__form" onSubmit={(evt) => onSubmitHandler(evt)}>
      <input className="rating__input" id="star-5" type="radio" name="rating" value="5"
        disabled={isDisable} onChange={(evt) => onChangeHandler(evt)}/>
      <label className="rating__label" htmlFor="star-5">Rating 1</label>
      <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"
        minLength={ReviewLength.MIN}
        maxLength={ReviewLength.MAX}
        required
        disabled={isDisable}
        onChange={(evt) => onChangeHandler(evt)}/>
    </form>
  );
};

AddReview.propTypes = {
  isDisable: PropTypes.bool.isRequired,
  onSubmitHandler: PropTypes.func.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
};

const noop = () => {};
const mockEvent = {
  preventDefault() {}
};

configure({adapter: new Adapter()});


it(`Should form be submited`, () => {
  const AddReviewWrapped = withReview(AddReview);
  const onSubmitHandler = jest.fn();

  const wrapper = mount(
      <AddReviewWrapped
        onSubmit={onSubmitHandler}
        film={filmInfo}
        isDisable={false}
        rating={Settings.rating}
        comment={Settings.comment}
        onSubmitHandler={noop}
        onChangeHandler={noop}
      />);

  const form = wrapper.find(`.add-review__form`);
  const ratingStars = wrapper.find(`.rating__input`);
  const comment = wrapper.find(`.add-review__textarea`);
  ratingStars.simulate(`change`, mockEvent);
  comment.simulate(`change`, {target: {value: Settings.comment}});
  form.simulate(`submit`);
  expect(onSubmitHandler).toHaveBeenCalledTimes(1);
  expect(onSubmitHandler).toHaveBeenCalledWith(Settings);
});


