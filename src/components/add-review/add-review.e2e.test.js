import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AddReview from "./add-review.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const mockEvent = {
  preventDefault() {}
};

const Settings = {
  rating: 5,
  comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
};

const film = {
  filmTitle: `The Rock`,
  backgroundPoster: `img/bg-the-grand-budapest-hotel.jpg`,
  filmPoster: `img/the-grand-budapest-hotel-poster.jpg`,
};

it(`Should form be submited`, () => {
  const onSubmitHandler = jest.fn();

  const addReview = mount(
      <AddReview
        onSubmit={onSubmitHandler}
        film={film}
        isDisable={false}
      />
  );

  const form = addReview.find(`.add-review__form`);
  const ratingStars = addReview.find(`.rating__input`);
  const comment = addReview.find(`.add-review__textarea`);
  ratingStars.at(4).simulate(`change`, mockEvent);
  comment.simulate(`change`, {target: {value: Settings.comment}});
  form.simulate(`submit`);
  expect(onSubmitHandler).toHaveBeenCalledTimes(1);
  expect(onSubmitHandler).toHaveBeenCalledWith(Settings);
});
