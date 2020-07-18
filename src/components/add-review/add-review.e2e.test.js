import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AddReview from "./add-review.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const Settings = {
  rating: 5,
  comment: ``,
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
      />
  );

  const form = addReview.find(`.add-review__form`);
  form.simulate(`submit`);
  expect(onSubmitHandler).toHaveBeenCalledTimes(1);
  expect(onSubmitHandler).toHaveBeenCalledWith(Settings);
});
