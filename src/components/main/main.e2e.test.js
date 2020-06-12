import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main";

const Settings = {
  FILM_TITLE: `The Rock`,
  FILM_GENRE: `Action`,
  RELEASE_DATE: 1996
};

const films = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`];

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should film title be pressed`, () => {
  const onTitleClickHandler = jest.fn();

  const main = shallow(
      <Main
        title={Settings.FILM_TITLE}
        genre={Settings.FILM_GENRE}
        releaseDate={Settings.RELEASE_DATE}
        films={films}
        onTitleClickHandler={onTitleClickHandler}
      />
  );

  const filmTitles = main.find(`small-movie-card__link`);

  filmTitles.forEach((filmTitle) => filmTitle.props().onClick());

  expect(onTitleClickHandler.mock.calls.length).toBe(filmTitles.length);
});
